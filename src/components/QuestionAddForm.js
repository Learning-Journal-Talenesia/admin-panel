import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { postData } from '../services/api';
import '../styles/Form.css';
import '../styles/Button.css';

const QuestionForm = () => {
  const [idThema, setIdThema] = useState('');
  const [thema, setThema] = useState('');
  const [questions, setQuestions] = useState(['']);
  const [inputType, setInputType] = useState('checkbox'); // Default to checkbox
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const idThemaParam = searchParams.get('idThema');
    const themaParam = searchParams.get('thema');

    if (idThemaParam && themaParam) {
      setIdThema(idThemaParam);
      setThema(themaParam);
    }
  }, [location.search]);

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleAdd = async () => {
    try {
      const filteredQuestions = questions.filter(question => question.trim() !== '');

      const newData = {
        idThema,
        thema,
        question: inputType === 'checkbox' ? filteredQuestions : filteredQuestions[0],
        inputType,
      };

      await postData(newData);
      navigate(-1);
    } catch (error) {
      alert(`Failed to add data. Please try again. \n ${error}`);
    }
  };

  const renderInputField = () => {
    switch (inputType) {
      case 'checkbox':
        return (
          <div>
            <label>Pertanyaan</label>
            {questions.map((question, index) => (
              <div key={index} className="question-container">
                <h2 className="nomor">{index+1}</h2>
                <input                  
                  type="text"
                  value={question}                  
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                {index !== 0 && (<button type="button" onClick={() => handleRemoveQuestion(index)} className='btn remove-question'>
                  -
                </button>)}
              </div>
            ))}
            <button type="button" onClick={handleAddQuestion} className="btn add-question">
              +
            </button>
          </div>
        );
      default:
        return (
          <div>
            <label>Pertanyaan</label>
            <textarea
              value={questions[0] || ''}
              onChange={(e) => setQuestions([e.target.value])}
            />
          </div>
        );
    }
  };

  return (
    <div className='form-container'>
      <div className='form-header'>
        <h1>Tambah Pertanyaan</h1>
      </div>
      <div className="my-form">
        <label>ID Tema</label>
        <input
          type="text"
          value={idThema}
          onChange={(e) => setIdThema(e.target.value)}
        />
        <label>Tema</label>
        <input
          type="text"
          value={thema}
          onChange={(e) => setThema(e.target.value)}
        />
        <label>Tipe</label>
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="checkbox">Checkbox</option>
          <option value="radiobutton">Radio Button</option>
          <option value="textarea">Textarea</option>
        </select>
        {renderInputField()}
        <div className="submit-btn-container">
          <button onClick={handleAdd} className="btn submit">Tambahkan</button>
          <button onClick={() => navigate('/table')} className="btn cancel">Batal</button>
        </div>        
      </div>
    </div>
  );
};

export default QuestionForm;
