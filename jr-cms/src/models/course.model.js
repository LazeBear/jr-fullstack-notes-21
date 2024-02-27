// fields: code, name, description
const { Schema, model } = require('mongoose');

const schema = new Schema({
  // _id: {
  //   type: String,
  //   alias: 'code',
  // },
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'this is a default description',
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
});

module.exports = model('Course', schema);
