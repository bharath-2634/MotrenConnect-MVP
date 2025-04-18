const mongoose = require("mongoose");

const ContributorSchema = new mongoose.Schema({
    userId : {
        type : String,
        reuired: true,
        unique: true, 
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

const Contributor = mongoose.model("Contributor", ContributorSchema);
module.exports = Contributor;