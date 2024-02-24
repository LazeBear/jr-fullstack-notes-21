const { Router } = require('express');
const {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require('../controllers/student.controller');

const studentRouter = Router();

studentRouter.get('/', getAllStudents);
studentRouter.post('/', addStudent);
studentRouter.get('/:id', getStudentById);
studentRouter.patch('/:id', updateStudentById);
studentRouter.delete('/:id', deleteStudentById);

module.exports = studentRouter;
