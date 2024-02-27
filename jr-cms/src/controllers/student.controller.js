const NotFoundException = require('../common/exceptions/notFound.exception');
const getLogger = require('../common/logger');
const Student = require('../models/student.model');
const Course = require('../models/course.model');

const logger = getLogger(__filename);

const getAllStudents = async (req, res, next) => {
  try {
    // const totoalDocuments = await Student.countDocuments();
    // const {page = 1} = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const students = await Student.find().limit(pageSize).skip(skip).exec(); // query
    res.formatResponse(students);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addStudent = async (req, res, next) => {
  try {
    // basic data validation
    const { firstName, lastName, email } = req.body;

    // const student = new Student({firstName, lastName, email});
    // await student.save();
    const student = await Student.create({ firstName, lastName, email });
    res.formatResponse(student, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).exec();
    if (!student) {
      // throw new NotFoundException(`Student not found: ${id}`);
      return res.formatResponse(`Student not found: ${id}`, 404);
    }
    res.formatResponse(student);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};
const updateStudentById = async (req, res, next) => {
  try {
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
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};
const deleteStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id).exec();
    if (!student) {
      return res.formatResponse(`Student not found: ${id}`, 404);
    }
    await Course.updateMany(
      { students: student._id },
      {
        $pull: {
          students: student._id,
        },
      }
    ).exec();
    res.formatResponse(undefined, 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

// POST /v1/students/:studentId/courses/:courseId
const addStudentToCourse = async (req, res, next) => {
  try {
    const { courseId, studentId } = req.params;
    // 1. 通过学生的id查找学生document
    const student = await Student.findById(studentId).exec();
    // 2. 查找课程的document
    const course = await Course.findById(courseId).exec();
    // 如果学生或者课程不存在，这个请求就不成立
    if (!student) {
      throw new NotFoundException(`Student not found: ${studentId}`);
    }
    if (!course) {
      throw new NotFoundException(`Course not found: ${courseId}`);
    }
    // 3. 给学生添加课程信息
    student.courses.addToSet(courseId);
    // Student.findByIdAndUpdate(studentId,{$addToSet:{courses: [courseId]}}).exec()
    // 4. 给课程添加学生信息
    course.students.addToSet(studentId);
    // 5. 保存学生和课程
    await student.save();
    await course.save();
    res.formatResponse(student);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

// DELETE /v1/students/:studentId/courses/:courseId
const removeStudentFromCourse = async (req, res, next) => {
  try {
    const { courseId, studentId } = req.params;
    const student = await Student.findById(studentId).exec();
    const course = await Course.findById(courseId).exec();
    if (!student) {
      throw new NotFoundException(`Student not found: ${studentId}`);
    }
    if (!course) {
      throw new NotFoundException(`Course not found: ${courseId}`);
    }
    // const oldCourseLength = student.courses.length;
    student.courses.pull(courseId);
    // Student.findByIdAndUpdate(studentId,{$pull:{courses: [courseId]}}).exec()
    course.students.pull(studentId);
    await student.save();
    await course.save();
    res.formatResponse(undefined, 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addStudentToCourse,
  removeStudentFromCourse,
};
