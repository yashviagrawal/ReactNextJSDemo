// src/components/FormPage.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import './FormPage.css'; // Import the CSS file

interface FormData {
  name: string;
  email: string;
  department: string;
  manager: string;
}

interface FormPageProps {
  onClose: () => void;
}

const FormPage: React.FC<FormPageProps> = ({ onClose }) => {
  const router = useRouter(); // Initialize the router
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    department: '',
    manager: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Mock API call for form submission
      await axios.post('https://530b-2401-4900-1720-c0fc-15ba-e7fe-d404-9abb.ngrok-free.app/data', formData);

      // Assume a successful form submission
      setIsSuccess(true);

      // Simulate a delay before closing the form and refreshing the dashboard
      setTimeout(() => {
        // Close the form pop-up
     

        // Reset the success state
        setIsSuccess(false);

        // Navigate back to the dashboard
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-full-screen">
      <div className="form-header">
        <button onClick={() => router.push('/dashboard')} className="home-button">
          Home
        </button>
      </div>
      <div className="form-content">
        <h1>Form Page</h1>

        {isSuccess ? (
          <p className="success-message">Form submitted successfully!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Department:
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Manager:
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormPage;
