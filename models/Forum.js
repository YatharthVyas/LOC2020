const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create volunteer Schema and model

const ForumSchema = new Schema(
  {
    user: {
      type: String,
    },
    institute: {
      type: String,
    },
    ID: {
      type: String,
      required: true,
    },
    Q: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    topic: [{ type: String }],
    Ans: [
      {
        text: String,
        user: String,
        institute: String,
      },
    ],
  },
  { collection: 'Forum' }
);

const Forum = mongoose.model('forum', ForumSchema);

module.exports = Forum;
