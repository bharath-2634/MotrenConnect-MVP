// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  workFlow: {
    type: String
  },
  documentUrl: {
    type: String 
  },
  techStack: {
    type: [String] 
  },
  submissionDate: {
    type: Date,
    required: true
  },
  maxBudget: {
    type: Number,
    required: true
  },
  isMentorshipProject: {
    type: Boolean,
    default: true
  },
  metadata: {
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["waiting","Accepted", "progress", "completed"],
      default: "waiting",
    },
  },
});

module.exports = mongoose.model('Project', projectSchema);
