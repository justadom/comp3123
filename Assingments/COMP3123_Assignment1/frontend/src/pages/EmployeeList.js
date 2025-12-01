import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  TextField,
  MenuItem
} from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeAPI } from '../services/api';

const EmployeeList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchCriteria, setSearchCriteria] = useState({
    department: '',
    position: ''
  });

  
  const { data: response = {}, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: employeeAPI.getAll, 
  });

  const employees = Array.isArray(response.data) ? response.data : [];

  const deleteMutation = useMutation({
    mutationFn: employeeAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    return (
      (!searchCriteria.department || emp.department === searchCriteria.department) &&
      (!searchCriteria.position || emp.position === searchCriteria.position)
    );
  });

  const departments = [...new Set(employees.map((emp) => emp.department))];
  const positions = [...new Set(employees.map((emp) => emp.position))];

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Employee List</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/employees/new')}
        >
          Add Employee
        </Button>
      </Box>

      {/* Search Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search Employees
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            select
            label="Department"
            value={searchCriteria.department}
            onChange={(e) =>
              setSearchCriteria((prev) => ({ ...prev, department: e.target.value }))
            }
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All Departments</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>{dept}</MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Position"
            value={searchCriteria.position}
            onChange={(e) =>
              setSearchCriteria((prev) => ({ ...prev, position: e.target.value }))
            }
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All Positions</MenuItem>
            {positions.map((pos) => (
              <MenuItem key={pos} value={pos}>{pos}</MenuItem>
            ))}
          </TextField>
        </Box>
      </Paper>

      {/* Employee Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.employee_id}>
                <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>${employee.salary}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/employees/${employee.employee_id}`)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => navigate(`/employees/${employee.employee_id}/edit`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(employee.employee_id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeList;
