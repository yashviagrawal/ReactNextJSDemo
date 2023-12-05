// src/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import './DashboardPage.css'; // Import the CSS file

interface UserData {
  name: string;
  email: string;
  department: string;
  manager: string;
}

const DashboardPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/data');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNavigateToForm = () => {
    router.push('/form');
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

      {/* Button to navigate to Form Page */}
      <button onClick={handleNavigateToForm} className="add-button">
        +
      </button>
    </div>
  );
};

export default DashboardPage;
