// CreateTemaPopup.js
import React, { useState } from 'react';
import { postTema } from '../services/api';

const CreateTemaPopup = ({ onClose, onCreate }) => {
  const [idThema, setIdThema] = useState('');
  const [thema, setThema] = useState('');

  const handleCreateTema = async () => {
    try {
      // Validate that idThema and thema are not empty
      if (!idThema || !thema) {
        // Handle validation error
        return;
      }

      const newTema = {
        idThema,
        thema,
      };

      await postTema(newTema);
      onCreate();
    } catch (error) {
      console.error('Error creating tema:', error);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Create New Thema</h2>
        <label htmlFor="idThema">ID Thema:</label>
        <input
          type="text"
          id="idThema"
          value={idThema}
          onChange={(e) => setIdThema(e.target.value)}
        />
        <label htmlFor="thema">Thema Title:</label>
        <input
          type="text"
          id="thema"
          value={thema}
          onChange={(e) => setThema(e.target.value)}
        />
        <button onClick={handleCreateTema}>Create Thema</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateTemaPopup;
