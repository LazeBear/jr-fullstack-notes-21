const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // create a unique index
  },
  password: {
    type: String,
    required: true,
  },
  // role: {
  //   type: String,
  //   enum: ['admin', 'user'],
  // },
  // locked: {
  //   type: Boolean
  // }
});

// 针对document
// schema.methods.hashPassword = async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// }

// in controller
// await user.hashPassword();
// await user.save();

schema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = model('User', schema);
