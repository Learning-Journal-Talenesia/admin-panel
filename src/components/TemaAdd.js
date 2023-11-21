// CreateTemaPopup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postTema } from '../services/api';
import '../styles/Confirmation.css';
import '../styles/Form.css';
import '../styles/Button.css';

const CreateTemaPopup = ({ onClose, onCreate }) => {
  const [idThema, setIdThema] = useState('');
  const [thema, setThema] = useState('');
  const navigate = useNavigate();

  const handleCreateTema = async () => {
    try {      
      if (!idThema || !thema) {        
        return;
      }

      const newTema = {
        idThema,
        thema,
      };

      await postTema(newTema);            
      navigate(`/table?theme=${idThema}`);
      navigate(0);
    } catch (error) {
      console.error('Error creating tema:', error);
    }
  };

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-box my-form">
        <h1>Buat Tema Baru</h1>
        <label htmlFor="idThema">ID Tema</label>
        <input
          type="text"
          id="idThema"
          value={idThema}
          onChange={(e) => setIdThema(e.target.value)}
          required
        />
        <label htmlFor="thema">Judul Tema</label>
        <input
          type="text"
          id="thema"
          value={thema}
          onChange={(e) => setThema(e.target.value)}
          required
        />
        <div className='center-div'>
          <button onClick={handleCreateTema} className="btn submit">Buat Tema</button>
          <button onClick={onClose} className='btn cancel'>Batal</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTemaPopup;
