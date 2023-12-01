// src/DashboardPage.tsx
import React, { useState } from 'react';
import FormPage from './FormPage';
import './DashboardPage.css'; // Import the CSS file

const DashboardPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard Demo</h1>

      {/* Table Structure/List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>HR</td>
          </tr>
          {/* Add more dummy data as needed */}
        </tbody>
      </table>

      {/* Button for Form Pop-up */}
      <button onClick={handleAddButtonClick} className="add-button">
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
