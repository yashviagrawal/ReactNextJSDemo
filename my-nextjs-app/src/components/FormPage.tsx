// src/FormPage.tsx
import React, { useState } from 'react';
import './FormPage.css'; // Import the CSS file

interface FormData {
  name: string;
  email: string;
  department: string;
  manager: string;
}

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    department: '',
    manager: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    department: '',
    manager: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error when changing input
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Add validation logic here (e.g., required fields, email format, etc.)
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.department.trim()) {
      errors.department = 'Department is required';
    }
    // Add more validations as needed

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // POST data to the server
        const response = await fetch('http://127.0.0.1:8000/data', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Data successfully uploaded to the server');
          setIs
        } else {
          console.error('Failed to upload data to the server');
        }
      } catch (error) {
        console.error('An error occurred during the API call:', error);
      }
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <div className="form-page-container">
      <h2>Form Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
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
          {formErrors.email && <span className="error">{formErrors.email}</span>}
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
          {formErrors.department && <span className="error">{formErrors.department}</span>}
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
          {formErrors.manager && <span className="error">{formErrors.manager}</span>}
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
