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
  id: string;
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

  const handleNavigateToForm = (data: UserData | null = null) => {
    // If data is provided, navigate to the form with query parameters
    if (data) {
      const { name, email, department, manager, date, status, id } = data;
      router.push({
        pathname: '/form',
        query: { name, email, department, manager, date, status, id },
      });
    } else {
      // If no data, navigate to the form without query parameters
      router.push('/form');
    }
  };

  const handleFilter = (column: string) => {
    // Implement your filtering logic here based on the selected column
    console.log(`Filtering by ${column}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://530b-2401-4900-1720-c0fc-15ba-e7fe-d404-9abb.ngrok-free.app/data/${id}`);
      fetchData(); // Refresh data after deletion
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
            <th>
              Department
              <span className="filter-icon" onClick={() => handleFilter('department')}>
                🕳️
              </span>
            </th>
            <th>Manager</th>
            <th>
              Date
              <span className="filter-icon" onClick={() => handleFilter('date')}>
                🕳️
              </span>
            </th>
            <th>
              Status
              <span className="filter-icon" onClick={() => handleFilter('status')}>
                🕳️
              </span>
            </th>
            <th>Action</th> {/* New column for Edit and Delete buttons */}
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
                <button onClick={() => handleNavigateToForm(user)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to navigate to Form Page */}
      <button onClick={() => handleNavigateToForm()} className="add-button">
        +
      </button>
    </div>
  );
};

export default DashboardPage;
