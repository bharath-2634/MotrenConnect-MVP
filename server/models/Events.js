const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({

    eventName : {
        type : String,
        required : true,
        unique : true
    },
    eventDescription : {
        type : String,
        required : true,
    },
    eventDate : {
        type : Date,
        required : true
    },
    eventTime : {
        type: String,
        required : true    
    },
    targetFund : {
        type : String,
        required : true
    },
    fundCollected : {
        type : String,
    },
    registered : [
        {
            type : Object, // to store userId
            fund: String // the amount the user has transformed
        },
        
    ],
    posters : [String], // array of images stored in cloudinary 
    eventLocation : {
        type : String,
        required : true
    },
    onSpotEvents : [
        {
           Name : {
            type : String,
            required : true
           },
           poster : {
            type : String,
            required : true
           },
           time : {
            type: String,
            required : true
           }
        }
    ],
    eventCoordinators : [
        {
            Name : {
                type : String,
                required : true
            },
            contact : {
                type : String,
                required : true
            }
        }
    ],

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
          enum: ["active", "inactive", "outdated"],
          default: "active",
        },
    },

});


const Events = mongoose.model("Events", EventSchema);
module.exports = Events;