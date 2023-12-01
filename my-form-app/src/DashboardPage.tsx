// src/DashboardPage.tsx
import React, { useState } from 'react';
import FormPage from './FormPage';
import './dash.css';

const DashboardPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h1>Dashboard Demo</h1>

      {/* Table Structure/List */}
      <ul>
        <li>
          <strong>Name</strong>: John Doe, <strong>Email</strong>: john@example.com,{' '}
          <strong>Department</strong>: HR
        </li>
        {/* Add more dummy data as needed */}
      </ul>

      {/* Button for Form Pop-up */}
      <button onClick={handleAddButtonClick} style={{ position: 'fixed', bottom: 20, right: 20 }}>
        +
      </button>

      {/* Form Pop-up */}
      {showForm && (
        <div className="form-popup">
          <div className="form-container">
            <span className="close" onClick={handleCloseForm}>
              &times;
            </span>
            <FormPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
