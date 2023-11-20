// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionsTable from '../components/QuestionTable';
import QuestionAddForm from '../components/QuestionAddForm';
import QuestionEditForm from '../components/QuestionEditForm';
import '../styles/Header.css';

function App() {
  return (
    <div>     
      <div className="header">
        <img className="logo" src="/logo-nav.9e6fa30f18a681f848661e08d0e0c819.svg" alt="Logo Talenesia"/>
      </div>
      <Router>        
        <Routes>
          <Route path="/table" element={<QuestionsTable />} />
          <Route path="/add_question" element={<QuestionAddForm />} />
          <Route path="/edit_question/:id" element={<QuestionEditForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
