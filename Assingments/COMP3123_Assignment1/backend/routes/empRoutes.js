const express = require('express');
const router = express.Router();
const empController = require('../controllers/empController');
const { createEmployeeValidation, objectIdParamValidation, objectIdQueryValidation } = require('../middleware/validators');

router.get('/employees', empController.listEmployees); 
router.post('/employees', createEmployeeValidation, empController.createEmployee); 
router.get('/employees/:eid', objectIdParamValidation, empController.getEmployee); 
router.put('/employees/:eid', objectIdParamValidation, empController.updateEmployee); 
router.delete('/employees', objectIdQueryValidation, empController.deleteEmployee); 
router.get('/employees/search', empController.searchEmployees);


module.exports = router;