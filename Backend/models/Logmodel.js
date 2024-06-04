const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    startingTime:{
        type: String,
        required: true
    },
    endingTime:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    workSummary:{
        type: String,
        required: true
    },
    issue:{
        type: String,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('log',LogSchema);