const { Router } = require('express');
const getLogger = require('../common/logger');
const Course = require('../models/course.model');
const NotFoundException = require('../common/exceptions/notFound.exception');
const addCourseSchema = require('../validations/addCourseSchema');
const Student = require('../models/student.model');

const logger = getLogger(__filename);

/**
 * 1. callback
 * Course.find().exec((err, courses) => {
 *    if (err) {
 *      next(err);  // 二选一
 *      return res.status(500).json({error: "error"});
 *    }
 * })
 *
 * 2. promise
 * Course.find().exec().then((courses)=>{}).catch(error=>{})
 *
 * 3. async/await
 * try {
 *    const courses = await Course.find().exec();
 *    res.json(courses);
 * } catch(e) {
 *    next(err);  // 二选一
 *    return res.status(500).json({error: "error"});
 * }
 *
 * express-async-errors
 */

// function catchAllErrors(routeHandler) {
//   return (req, res, next) =>{
//     try {
//       routeHandler(req, res, next);
//     } catch(e) {
//       next(e);
//     }
//   }
// }

// router.get('/', catchAllErrors(getAllCourses));

const getAllCourses = async (req, res, next) => {
  try {
    // TODO: add pagination
    const courses = await Course.find().exec();
    res.formatResponse(courses);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addCourse = async (req, res, next) => {
  try {
    // const schema = Joi.object({
    //   // code 以字母开头，数字结尾
    //   code: Joi.string()
    //     .regex(/^[a-zA-Z]+[0-9]+$/)
    //     .message('Invalid code format')
    //     .required(),
    //   name: Joi.string().min(4).max(255).required(),
    //   description: Joi.string().optional(),
    // });
    const validBody = await addCourseSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    // const { code, name, description } = req.body;

    const course = await Course.create(validBody);
    res.formatResponse(course, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};
const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id)
      // .populate('students', 'firstName lastName email')
      .populate('students', {
        firstName: true,
      })
      .exec();
    if (!course) {
      throw new NotFoundException(`Course not found: ${id}`);
      // return res.formatResponse(`Course not found: ${id}`, 404);
    }
    res.formatResponse(course);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};
const updateCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, name, description } = req.body;
    const course = await Course.findByIdAndUpdate(
      id,
      { code, name, description },
      {
        new: true,
      }
    ).exec();
    if (!course) {
      return res.formatResponse(`Course not found: ${id}`, 404);
    }
    res.formatResponse(course);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};
const deleteCourseById = async (req, res, next) => {
  // Access checker
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id).exec();
    if (!course) {
      return res.formatResponse(`Course not found: ${id}`, 404);
    }
    await Student.updateMany(
      { courses: course._id },
      {
        $pull: {
          // courses: { $in: [course._id] },
          courses: course._id,
        },
      }
    ).exec();
    res.formatResponse(undefined, 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

module.exports = {
  getAllCourses,
  addCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
