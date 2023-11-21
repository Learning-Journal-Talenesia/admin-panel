// QuestionsTable.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QuestionEditForm from '../components/QuestionEditForm';
import DeleteConfirmation from '../components/QuestionDeleteConfirmation';
import { fetchTema, fetchData, deleteData, deleteQuestionById, deleteTemaById } from '../services/api';
import '../styles/Tables.css';
import '../styles/Button.css';
import CreateTemaPopup from '../components/TemaAdd';

const QuestionsTable = () => {
  const [data, setData] = useState([]);
  const [tema, setTema] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationTema, setShowConfirmationTema] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState('');
  const [sortByIdThema, setSortByIdThema] = useState('asc');
  const [showCreateTemaPopup, setShowCreateTemaPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchData()
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetchTema()
      .then(tema => setTema(tema))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Load selected theme from the path on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedThemeIdParam = searchParams.get('theme');
    if (selectedThemeIdParam) {
      setSelectedThemeId(selectedThemeIdParam);
    }
  }, [location.search]);

  const handleAdd = () => {
    // Check if a theme is selected
    if (selectedThemeId) {
      const selectedTema = tema.find((theme) => theme.idThema === selectedThemeId);

      if (selectedTema) {
        // Pass the selected theme information to the add question form
        navigate(`/add_question?idThema=${selectedTema.idThema}&thema=${selectedTema.thema}`);
      }
    } else {
      navigate('/add_question');
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item._id === id);
    setEditItem(itemToEdit);
    navigate(`/edit_question/${id}`);
  };

  const handleUpdate = (updatedItem) => {
    setEditItem(null);
    const updatedData = data.map(item =>
      item._id === updatedItem._id ? updatedItem : item
    );
    setData(updatedData);
  };

  const handleDelete = (id) => {
    setShowConfirmation(true);
    setDeleteItemId(id);
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    deleteData(deleteItemId)
      .then(() => setData(data.filter(item => item._id !== deleteItemId)))
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteItemId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleThemeChange = (e) => {
    const selectedThemeId = e.target.value;
    setSelectedThemeId(selectedThemeId);

    // Update the path with the selected theme
    if(selectedThemeId!=="")
    {
      navigate(`?theme=${selectedThemeId}`);
    }else{
      navigate(``);
    }
  };

  const handleSortByIdThema = () => {
    setSortByIdThema(sortByIdThema === 'asc' ? 'desc' : 'asc');
  };

  const handleDeleteTema = async () => {    
    try {
      // Set showConfirmation to true to open the confirmation popup
      setShowConfirmationTema(true);
    } catch (error) {
      console.error('Error deleting tema:', error);
    }    
  };

  const handleConfirmDeleteTema = async () => {
    try {
      // Delete the selected theme and related questions
      await deleteTemaById(selectedThemeId);

      const questionsToDelete = data.filter(item => item.idThema === selectedThemeId);
      await Promise.all(questionsToDelete.map(async question => {
        await deleteQuestionById(question._id);
      }));

      // Navigate back to the table view
      navigate('/table');
      navigate(0);
    } catch (error) {
      console.error('Error deleting tema:', error);
    } finally {
      // Close the confirmation popup
      setShowConfirmationTema(false);
    }
  };

  const handleCancelDeleteTema = () => {
    // Close the confirmation popup
    setShowConfirmationTema(false);
  };

  const handleCreateTema = async () => {
    try {
      // You can add custom logic before showing the popup if needed
      setShowCreateTemaPopup(true);
    } catch (error) {
      console.error('Error creating tema:', error);
    }
  };     

  const sortedData = [...data];

  if (sortByIdThema) {
    sortedData.sort((a, b) =>
      sortByIdThema === 'asc' ? a.idThema - b.idThema : b.idThema - a.idThema
    );
  }

  const filteredData = sortedData.filter(item =>
    ((item?.thema?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (item?.question?.some(q => q.toLowerCase().includes(searchQuery.toLowerCase())) || false)) &&
    (selectedThemeId === '' || item?.idThema === selectedThemeId)
  );

  return (
    <div>
      <div className="content-header">
      <div className="thema">
        <select onChange={handleThemeChange} value={selectedThemeId}>
          <option value="">Semua Thema</option>
          {tema.map((theme) => (
            <option key={theme._id} value={theme.idThema}>
              {theme.thema}
            </option>
          ))}
        </select>
        {selectedThemeId && (
          <button onClick={handleDeleteTema} className="delete-tema-btn">
            Hapus Tema
          </button>
        )}        
          <button onClick={handleCreateTema} className="create-tema-btn">
            Buat Tema
          </button>        
      </div>
        <div className="search-container">
          <input
            className='search-input'
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <button onClick={() => handleAdd()} className="add">
        +
      </button>
      {!selectedThemeId||filteredData.length > 0 ? (
        <div className="table-container">
          <table className="my-table">
            <thead>
              <tr>
                {selectedThemeId === "" && (
                  <>
                    <th onClick={handleSortByIdThema} className='th-id-tema'>
                      ID Thema<span>{sortByIdThema === 'asc' ? '▲' : '▼'}</span>
                    </th>
                    <th>Thema</th>
                  </>
                )}
                <th>Pertanyaan</th>
                <th>Tipe</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item._id}>
                  {selectedThemeId === "" && (
                    <>
                      <td>{item.idThema}</td>
                      <td>{item.thema}</td>
                    </>
                  )}
                  <td>{item.question.join(', ')}</td>
                  <td>{item.inputType}</td>
                  <td className="acolumn">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="btn edit"
                    >
                      Ubah
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn delete"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showCreateTemaPopup && (
        <CreateTemaPopup
          onClose={() => setShowCreateTemaPopup(false)}
          onCreate={() => {
            // Optionally, you can refresh data after creating Thema
            fetchData()
              .then((data) => setData(data))
              .catch((error) => console.error('Error fetching data:', error));
            setShowCreateTemaPopup(false);
          }}
        />
      )}
        </div>
      ) : (
        <p>Click + to add data.</p>
      )}
      {editItem && (
        <QuestionEditForm item={editItem} onUpdate={handleUpdate} />
      )}
      {showConfirmation && (
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showConfirmationTema && (
        <DeleteConfirmation
          onConfirm={handleConfirmDeleteTema}
          onCancel={handleCancelDeleteTema}
        />
      )}
    </div>
  );
};

export default QuestionsTable;
