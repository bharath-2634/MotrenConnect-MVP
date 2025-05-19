const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  MCID: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: function () {
        return this.authType === "email"; 
    },
  },
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  authType: { 
    type: String, 
    enum: ["email", "google"],
    required: true 
  },
  role: {
    type: String,
    enum: ["subscriber", "developer", "contributor"],
    default: "subscriber",
  },
  monthTarget : {
    type : Number,
    default : 0
  },
  profile: {
    full_name: {
      type : String,
      default : ""
    },
    gender: {
      type: String,
      enum: ["male", "female", "trans"],
      default : "male"
    },
    envelope : [Number],
    phone: {
      type : String,
      default : ""
    },
    location: {
      type : String,
      default : ""
    },
    DOB: {
      type : Date,
      default : Date.now
    },
    bio: {
      type : String,
      default : ""
    },
    avatar_url: {
      type : String,
      default : ""
    },
    fundGrade: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    crown: {
      type: Number,
      default: 0,
    },
    eventCount: {
      type: Number,
      default: 0,
    },
    links: {
      website: String,
      github: String,
      linkedin: String,
      instagram: String,
      threads: String,
      twitter: String,
      // default : "",
    },
    experience: {
      work: String,
      education: String,
    },
    skills: [String],
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
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
