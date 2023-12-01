// src/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormPage from './FormPage';
import './DashboardPage.css'; // Import the CSS file

interface UserData {
  name: string;
  email: string;
  department: string;
  manager: string;
}

const DashboardPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/data');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

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
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.manager}</td>
              </tr>
            ))}
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
