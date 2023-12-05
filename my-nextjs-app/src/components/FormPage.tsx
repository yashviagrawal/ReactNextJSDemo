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
  date: string;
  status: string;
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
    date: '',
    status: 'draft', // Set default status to 'draft'
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({}); // Store validation errors

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    // Basic validation, you can customize this based on your requirements
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.manager.trim()) {
      newErrors.manager = 'Manager is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      // Stop submission if there are validation errors
      return;
    }

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
              {errors.name && <span className="error-message">{errors.name}</span>}
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
              {errors.email && <span className="error-message">{errors.email}</span>}
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
              {errors.department && <span className="error-message">{errors.department}</span>}
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
              {errors.manager && <span className="error-message">{errors.manager}</span>}
            </label>
            <br />
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Status:
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="draft">Draft</option>
                <option value="reverted">Reverted</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
              </select>
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
