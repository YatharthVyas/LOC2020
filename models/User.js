const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create volunteer Schema and model

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name field required'],
    },
    age: {
      type: Number,
      //required: [true, 'Age field required']
    },
    contact_n: {
      type: Number,
      required: [true, 'Contact Number required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email ID required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password field required'],
    },
    school: {
      type: String,
      //required: [true, 'School field required']
    },
    gender: {
      type: String,
      //required: [true, 'Gender field required']
    },

    subject: {
      type: String,
      //required: [true, 'Subject field required']
    },
    type: {
      type: String,
    },
    /*verifications: {
        type: mongoose.Schema.Types.ObjectId
    }*/
  },
  { collection: 'Users' }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;
