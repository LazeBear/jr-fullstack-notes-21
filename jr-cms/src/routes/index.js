const { Router } = require('express');
const studentRouter = require('./student.router');
const courseRouter = require('./course.router');

const v1Router = Router();

v1Router.use('/students', studentRouter);
v1Router.use('/courses', courseRouter);

module.exports = v1Router;
