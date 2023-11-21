import React from 'react';
import '../styles/Confirmation.css';
import '../styles/Button.css';

const QuestionDeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <p className="confirmation-message">Anda Yakin Ingin Menghapus Ini?</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm} className="btn remove-question">Ya</button>
          <button onClick={onCancel} className="btn cancel">Batal</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDeleteConfirmation;
