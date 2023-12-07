import React, { useState, useEffect } from 'react';
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
    status: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if there are query parameters
    const { name, email, department, manager, date, status, id } = router.query;
    if (name && email && department && manager && date && status) {
      setFormData({
        name: name as string,
        email: email as string,
        department: department as string,
        manager: manager as string,
        date: date as string,
        status: status as string,
      });
    }
  }, [router.query]); // Run the effect when the query parameters change

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Check if there is an id in the query parameters
      const { id } = router.query;

      if (id) {
        // If id exists, make a PUT request to update the existing entry
        await axios.put(`https://5f74-2401-4900-1d77-2627-ed85-68c3-18e2-5c9f.ngrok-free.app/data/${id}`, formData);
      } else {
        // If no id, make a POST request to create a new entry
        await axios.post('https://5f74-2401-4900-1d77-2627-ed85-68c3-18e2-5c9f.ngrok-free.app/data', formData);
      }

      // Assume a successful form submission
      setIsSuccess(true);

      // Simulate a delay before closing the form and refreshing the dashboard
      setTimeout(() => {
        // Close the form pop-up
        // onClose();

        router.push('/dashboard');
        // Reset the success state
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-full-screen">
      <div className="form-header"></div>
      <div className="form-content">
        <h1>Form Page</h1>

        {isSuccess ? (
          <p className="success-message">Form submitted successfully!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <label>
              Department:
              <input type="text" name="department" value={formData.department} onChange={handleChange} />
            </label>
            <br />
            <label>
              Manager:
              <input type="text" name="manager" value={formData.manager} onChange={handleChange} />
            </label>
            <br />
            <label>
              Date:
              <input type="text" name="date" value={formData.date} onChange={handleChange} />
            </label>
            <br />
            <label>
              Status:
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="draft">Draft</option>
                <option value="reverted">Reverted</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
              </select>
            </label>
            <br />
            <button onClick={() => router.push('/dashboard')} className="home-button" type="button">
              Home
            </button>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormPage;
