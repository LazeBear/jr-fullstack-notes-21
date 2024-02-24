const { Router } = require('express');
const studentRouter = require('./student.router');

const v1Router = Router();

v1Router.use('/students', studentRouter);

module.exports = v1Router;
