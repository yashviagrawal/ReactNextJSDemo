// pages/dashboard.tsx
import React from 'react';
import DashboardPage from '../components/DashboardPage';

const Dashboard: React.FC = () => {
  const data = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'IT',
      manager: 'Jane Manager',
    },
    {
      name: 'Yashvi',
      email: 'yashvi@example.com',
      department: 'Finance',
      manager: 'Mike Manager',
    },
  ];

  return <DashboardPage data={data} />;
};

export default Dashboard;
