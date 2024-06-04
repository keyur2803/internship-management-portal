const express = require("express");
const logRoutes = require("./Routes/logsRoutes");
// const connectDB = require('./config/db');
// const cors = require('cors');
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// connectDB();
//routes
app.use("/", logRoutes);

//mongo connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
    
app.listen(process.env.PORT, () => {
    console.log("server started on port", process.env.PORT);
  });
})
.catch((err) => {
    console.log(err);
});

