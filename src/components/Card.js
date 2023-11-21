import React from 'react';

const Card = ({ qna }) => {
  return (
    <div className="qna-card">
      <div className="qna-header">
        <p className="qna-id">ID Tema: {qna.idThema}</p>
        <p className="qna-thema">{qna.thema}</p>
      </div>
      <div className="qna-details qna-qna">
        <p className="qna-label">ID User</p>
        <input
          type="text"
          value={qna.idUser}  // Display answers from the API
          readOnly
        />
        <p className="qna-label">User</p>        
        <input
          type="text"
          value={qna.userName}  // Display answers from the API
          readOnly
        />
        {qna.qna.map((item, index) => (
          <div key={index} className="qna-item">              
            <p className="qna-label">Question</p>
            <input
              type="text"
              value={item.q ? item.q.join(', ') : ''}  // Display questions from the API
              readOnly
            />              
            <p className="qna-label">Answers</p>
            {Array.isArray(item.a) && item.a.map((answer, answerIndex) => (
              <input
                key={answerIndex}
                type="text"
                value={answer}
                readOnly
              />
            ))}
          </div>
        ))}
      </div>      
    </div>
  );
};

export default Card;