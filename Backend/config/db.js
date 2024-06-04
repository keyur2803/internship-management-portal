 var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://keyurpansuriya0000:LpC8e0W6v5h5tZ7E@keyur.de8r9c7.mongodb.net/';
mongoose.connect(mongoDB);
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));