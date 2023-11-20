// AnswerList.js
import React, { useState, useEffect } from 'react';
import { fetchQnaData } from '../services/api';
import '../styles/AnswerCard.css';
import Card from './Card'; // Import the new component

const AnswerList = () => {
  const [qnaList, setQnaList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQnaData();
        setQnaList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredQnaList = qnaList.filter((qna) => {
    return (
      qna.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qna.idUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qna.idThema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qna.thema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qna.qna.some((item) =>
        item.a.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div>
        <div className="search-container"><input
            className='search-input'
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>      
        <div className="qna-card-list">
            {filteredQnaList.map((qna) => (
            <Card key={qna._id} qna={qna} />
            ))}
        </div>
    </div>
  );
};

export default AnswerList;
