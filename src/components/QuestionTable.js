// QuestionsTable.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionEditForm from '../components/QuestionEditForm';
import DeleteConfirmation from '../components/QuestionDeleteConfirmation';
import { fetchData, deleteData } from '../services/api';
import '../styles/Tables.css';
import '../styles/Button.css';

const QuestionsTable = () => {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByIdTema, setSortByIdTema] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAdd = () => {
    navigate('/add_question');
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

  const handleSortByIdTema = () => {
    setSortByIdTema(sortByIdTema === 'asc' ? 'desc' : 'asc');
  };

  const sortedData = [...data];

  if (sortByIdTema) {
    sortedData.sort((a, b) =>
      sortByIdTema === 'asc' ? a.idThema - b.idThema : b.idThema - a.idThema
    );
  }

  const filteredData = sortedData.filter(
    (item) =>
      item.thema.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.question.some((q) => q.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="search-container">
        <input
          className='search-input'
          type="text"
          placeholder="Cari..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <button onClick={() => handleAdd()} className="add">
        +
      </button>
      <div className="table-container">
        <table className="my-table">
          <thead>
            <tr>              
              <th className='id-tema' onClick={handleSortByIdTema}>
                <div className="th-content">
                  <span>ID Tema</span>
                  <span>
                    {sortByIdTema === 'asc' ? '▲' : '▼'}
                  </span>
                </div>
              </th>
              <th>Tema</th>
              <th>Pertanyaan</th>
              <th>Tipe</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>                
                <td>{item.idThema}</td>
                <td>{item.thema}</td>
                <td>{item.question.join(', ')}</td>
                <td>{item.inputType}</td>
                <td className="acolumn">
                  <button onClick={() => handleEdit(item._id)} className="btn edit">
                    Ubah
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="btn delete">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editItem && <QuestionEditForm item={editItem} onUpdate={handleUpdate} />}
      {showConfirmation && (
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default QuestionsTable;
