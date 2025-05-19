const mongoose = require("mongoose");

const DeveloperSchema = new mongoose.Schema({
    userId : {
        type : String,
        reuired: true,
        unique: true, 
    },
    domain : [String],
    techStack : [String],
    repoLink : [String],
    status : {
        type : String,
        enum : ["pending","success","failed"],
        default : "pending"
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

const Developer = mongoose.model("Developer", DeveloperSchema);
module.exports = Developer;