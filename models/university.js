var mongoose     = require("mongoose");

// SCHEMA SETUP
var universitySchema = new mongoose.Schema({
    name: String,
    tuition: String,
    image: String,
    description: String,
    createdAt:{type: Date, default: Date.now},
    location: String,
    lat: Number,
    lng: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("University", universitySchema);