const NotFoundException = require('../common/exceptions/notFound.exception');
const getLogger = require('../common/logger');
const Student = require('../models/student.model');

const logger = getLogger(__filename);

const getAllStudents = async (req, res) => {
  // TODO: add pagination
  const students = await Student.find().exec(); // query
  res.formatResponse(students);
};

const addStudent = async (req, res) => {
  // basic data validation
  const { firstName, lastName, email } = req.body;

  // const student = new Student({firstName, lastName, email});
  // await student.save();
  const student = await Student.create({ firstName, lastName, email });
  res.formatResponse(student, 201);
};
const getStudentById = async (req, res, next) => {
  // try {
  const { id } = req.params;
  const student = await Student.findById(id).exec();
  if (!student) {
    // throw new NotFoundException(`Student not found: ${id}`);
    return res.formatResponse(`Student not found: ${id}`, 404);
  }
  res.formatResponse(student);
  // } catch (e) {
  //   next(e);
  // }
};
const updateStudentById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  // db.collection.updateOne({_id: id},{$set:{xxxx}})
  const student = await Student.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
    },
    {
      new: true,
    }
  ).exec();
  if (!student) {
    return res.formatResponse(`Student not found: ${id}`, 404);
  }
  res.formatResponse(student);
};
const deleteStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.formatResponse(`Student not found: ${id}`, 404);
  }
  res.formatResponse(undefined, 204);
};

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
