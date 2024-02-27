const { Schema, model } = require('mongoose');
const Joi = require('joi');

const studentSchema = new Schema(
  {
    firstName: {
      type: String, // type: 'string',
      // uppercase: true,
      // lowercase: true,
      // alias: 'name', // rename - virtual field
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [
        {
          validator: (email) => {
            // return false -> invalid
            // return true -> valid

            // regex 正则表达式
            // /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test('email')

            // use validation library
            // Joi Yup validator.js
            // const validationRule = Joi.string().email();
            // const result = validationRule.validate(email);
            // return result.error === undefined;
            return Joi.string().email().validate(email).error === undefined;
          },
          msg: 'Invalid email format',
        },
      ],
    },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    // },
  }
);

const Student = model('Student', studentSchema);

module.exports = Student;

// cyclic dependency issue
