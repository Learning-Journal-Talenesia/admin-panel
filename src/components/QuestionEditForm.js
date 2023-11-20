// QuestionEditForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateData, fetchQuestionById } from '../services/api';
import '../styles/Form.css';
import '../styles/Button.css'; // Include the Button.css file

const QuestionEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedItem, setEditedItem] = useState({
    idThema: '',
    thema: '',
    question: [],
    inputType: '',
  });

  useEffect(() => {
    fetchQuestionById(id)
      .then((questionData) => setEditedItem(questionData))
      .catch((error) => console.error('Error fetching question by ID:', error));
  }, [id]);

  const handleEdit = () => {
    updateData(id, editedItem)
      .then((responseData) => {
        navigate('/table');
      })
      .catch((error) => console.error('Error updating data:', error));
  };

  const handleInputChange = (fieldName, value, index) => {
    setEditedItem((prevItem) => {
      if (fieldName === 'question' && prevItem.inputType === 'checkbox') {
        const updatedQuestions = [...prevItem.question];
        updatedQuestions[index] = value;
        return { ...prevItem, question: updatedQuestions };
      } else {
        return { ...prevItem, [fieldName]: value };
      }
    });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = Array.isArray(editedItem.question)
      ? [...editedItem.question]
      : [];
    updatedQuestions.splice(index, 1);
    setEditedItem((prevItem) => ({
      ...prevItem,
      question: updatedQuestions,
    }));
  };

  const handleAddQuestion = () => {
    setEditedItem((prevItem) => ({
      ...prevItem,
      question: [...prevItem.question, ''], // Add an empty question
    }));
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Ubah Pertanyaan</h1>
      </div>
      <div className="my-form">
        <label>ID Tema:</label>
        <input
          type="text"
          value={editedItem.idThema}
          onChange={(e) => handleInputChange('idThema', e.target.value)}
        />
      </div>
      <div className="my-form">
        <label>Tema</label>
        <input
          type="text"
          value={editedItem.thema}
          onChange={(e) => handleInputChange('thema', e.target.value)}
        />
      </div>
      <div className="my-form">
        <label>Tipe</label>
        <input className="input-type"
        value={editedItem.inputType} readOnly/>        
      </div>
      <div className="my-form">
        <label>Questions:</label>
        {Array.isArray(editedItem.question) &&
          editedItem.inputType === 'checkbox' ? (
          editedItem.question.map((question, index) => (
            <div key={index} className="question-container">
              <h2 className="nomor">{index + 1}</h2>
              <input
                type="text"
                value={question}
                onChange={(e) => handleInputChange('question', e.target.value, index)}
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="btn remove-question"
                >
                  -
                </button>
              )}
            </div>
          ))
        ) : (
          <input
            type="text"
            value={Array.isArray(editedItem.question)
              ? editedItem.question.join(', ')
              : ''}
            onChange={(e) =>
              handleInputChange(
                'question',
                e.target.value.split(',').map((item) => item.trim())
              )
            }
          />
        )}
        {editedItem.inputType === 'checkbox' && (
          <button
            type="button"
            onClick={handleAddQuestion}
            className="btn add-question"
          >
            +
          </button>
        )}
      </div>      
      <div className="submit-btn-container">
        <button onClick={handleEdit} className="btn submit">
          Update
        </button>
        <button onClick={() => navigate('/table')} className="btn cancel">
          Batal
        </button>
      </div>
    </div>
  );
};

export default QuestionEditForm;
