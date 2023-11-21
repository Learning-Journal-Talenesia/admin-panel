// AnswerList.js
import React, { useState, useEffect } from 'react';
import { fetchTema, fetchQnaData } from '../services/api';
import '../styles/Tables.css'

const AnswerList = () => {
  const [qnaData, setQnaData] = useState([]);
  const [themaOptions, setThemaOptions] = useState([]);
  const [selectedThema, setSelectedThema] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch Thema data when the component mounts
    fetchTema()
      .then((themaData) => {
        setThemaOptions(themaData);
      })
      .catch((error) => {
        console.error('Error fetching Thema data:', error);
      });

    // Fetch Q&A data when the component mounts
    fetchQnaData()
      .then((data) => {
        setQnaData(data);
      })
      .catch((error) => {
        console.error('Error fetching Q&A data:', error);
      });
  }, []);

  const handleThemaChange = (e) => {
    // Update the selected Thema when the dropdown value changes
    setSelectedThema(e.target.value);
  };

  const handleSearchChange = (e) => {
    // Update the search query when the input value changes
    setSearchQuery(e.target.value);
  };

  // Filter Q&A data based on the selected Thema and search query
  const filteredQnaData = qnaData.filter((qna) => {
    return (
      (!selectedThema || qna.idThema === selectedThema) &&
      qna.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div className="content-header">
        <div className="thema">
          <select
            id="thema"
            className="search-input"
            value={selectedThema}
            onChange={handleThemaChange}
          >
            <option value="">All</option>
            {themaOptions.map((thema) => (
              <option key={thema.idThema} value={thema.idThema}>
                {thema.thema}
              </option>
            ))}
          </select>
        </div>
        <div className="search-input-container">
          <input
            type="text"
            id="table-search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            placeholder="Search Username"
          />
        </div>
      </div>
      <div className="table-container">
        <table className="my-table">
          <thead>
            <tr>
              <th scope="col">Username</th>              
              <th scope="col">Tema</th>
              <th scope="col">Pertanyaan</th>
              <th scope="col">Answers</th>
            </tr>
          </thead>
          <tbody>
            {filteredQnaData.map((qna) => (
              <tr key={qna._id}>
                <td>{qna.userName}</td>                
                <td>{qna.thema}</td>
                <td>
                  {qna.qna.map((item, index) => (
                    <div key={index} className="mb-2">
                      <p>{item.q}</p>
                    </div>
                  ))}
                </td>
                <td>
                  {qna.qna.map((item, index) => (
                    <div key={index} className="mb-2">
                      <p>{item.a.join(', ')}</p>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnswerList;
