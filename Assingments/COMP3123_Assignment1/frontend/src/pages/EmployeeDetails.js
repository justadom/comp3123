import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Button,
  Divider
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { employeeAPI } from '../services/api';

const EmployeeDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const { data: employee, isLoading, error } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const res = await employeeAPI.getById(id);
      return res.data; 
    }
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Failed to load employee</Typography>;
  if (!employee) return <Typography>No employee found</Typography>;

  const firstName = employee.first_name || '';
  const lastName = employee.last_name || '';
  const email = employee.email || '';
  const position = employee.position || '';
  const department = employee.department || '';
  const salary = employee.salary ?? 0;
  const dateOfJoining = employee.date_of_joining
    ? new Date(employee.date_of_joining).toLocaleDateString()
    : '';

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box>
        <Typography variant="h6">Personal Information</Typography>
        <Typography><strong>First Name:</strong> {firstName}</Typography>
        <Typography><strong>Last Name:</strong> {lastName}</Typography>
        <Typography><strong>Email:</strong> {email}</Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>Work Information</Typography>
        <Typography><strong>Position:</strong> {position}</Typography>
        <Typography><strong>Department:</strong> {department}</Typography>
        <Typography><strong>Salary:</strong> ${salary}</Typography>
        <Typography><strong>Date of Joining:</strong> {dateOfJoining}</Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/employees/${id}/edit`)}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button variant="outlined" onClick={() => navigate('/employees')}>
            Back to List
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmployeeDetails;