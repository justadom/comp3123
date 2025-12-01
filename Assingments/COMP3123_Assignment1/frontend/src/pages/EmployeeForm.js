import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { employeeAPI } from '../services/api';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });
  const [error, setError] = useState('');

  const { data: employee } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => employeeAPI.getById(id),
    enabled: isEdit
  });

  useEffect(() => {
    if (employee && isEdit) {
      setFormData({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
        position: employee.position || '',
        salary: employee.salary != null ? employee.salary.toString() : '', 
        date_of_joining: employee.date_of_joining
          ? employee.date_of_joining.split('T')[0]
          : '',
        department: employee.department || ''
      });
    }
  }, [employee, isEdit]);

  const mutation = useMutation({
    mutationFn: isEdit
      ? (data) => employeeAPI.update(id, data)
      : employeeAPI.create,
    onSuccess: () => {
      navigate('/employees');
    },
    onError: (error) => {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      salary: formData.salary ? parseFloat(formData.salary) : 0 
    });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Employee' : 'Add New Employee'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Date of Joining"
          name="date_of_joining"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.date_of_joining}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Saving...' : (isEdit ? 'Update Employee' : 'Create Employee')}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/employees')}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmployeeForm;
