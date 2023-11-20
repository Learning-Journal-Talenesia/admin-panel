import React from 'react';
import '../styles/Confirmation.css';
import '../styles/Button.css';

const QuestionDeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-box">
        <p className="confirmation-message">Anda Yakin Ingin Menghapus Pertanyaan Ini?</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm} className="btn remove-question">Ya</button>
          <button onClick={onCancel} className="btn cancel">Batal</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDeleteConfirmation;
