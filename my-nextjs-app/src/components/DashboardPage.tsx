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
  date: string;
  status: string;
}

const DashboardPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://530b-2401-4900-1720-c0fc-15ba-e7fe-d404-9abb.ngrok-free.app/data');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNavigateToForm = () => {
    router.push('/form');
  };

  const handleEdit = (email: string) => {
    // Fetch the user data by email
    const selectedUser = userData.find(user => user.email === email);

    // Navigate to the form page and pass the user data
    router.push({
      pathname: '/form',
      query: { ...selectedUser },
    });
  };

  const handleDelete = async (email: string) => {
    // Perform the delete operation (Update your API endpoint accordingly)
    try {
      await axios.delete(`https://530b-2401-4900-1720-c0fc-15ba-e7fe-d404-9abb.ngrok-free.app/data/${email}`);
      // Fetch updated data
      await fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
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
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>{user.manager}</td>
              <td>{user.date}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEdit(user.email)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.email)} className="delete-button">
                  Delete
                </button>
              </td>
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
