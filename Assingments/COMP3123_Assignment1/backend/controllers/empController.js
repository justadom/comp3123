const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');

exports.listEmployees = async (req, res) => {
  try {
    const emps = await Employee.find();
    const out = emps.map(e => ({
      employee_id: e._id,
      first_name: e.first_name,
      last_name: e.last_name,
      email: e.email,
      position: e.position,
      salary: e.salary,
      date_of_joining: e.date_of_joining,
      department: e.department,
    }));
    return res.status(200).json(out);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

exports.createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ status: false, message: errors.array()[0].msg });
  try {
    const emp = await Employee.create(req.body);
    return res.status(201).json({ message: 'Employee created successfully.', employee_id: emp._id });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(400).json({ status: false, message: 'Employee email already exists' });
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.eid);
    if (!emp) return res.status(404).json({ status: false, message: 'Employee not found' });
    return res.status(200).json({
      employee_id: emp._id,
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining,
      department: emp.department,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: false, message: 'Employee not found' });
    return res.status(200).json({ message: 'Employee details updated successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const eid = req.query.eid;
  try {
    const deleted = await Employee.findByIdAndDelete(eid);
    if (!deleted) return res.status(404).json({ status: false, message: 'Employee not found' });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;
    let query = {};
    
    if (department) query.department = department;
    if (position) query.position = position;

    const emps = await Employee.find(query);
    const out = emps.map(e => ({
      employee_id: e._id,
      first_name: e.first_name,
      last_name: e.last_name,
      email: e.email,
      position: e.position,
      salary: e.salary,
      date_of_joining: e.date_of_joining,
      department: e.department,
    }));
    return res.status(200).json(out);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};