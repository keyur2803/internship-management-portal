const logmodel = require("../models/Logmodel");

// Add Log to the database
const AddLog = async (req, res) => {
  const { startingTime, endingTime, date, workSummary, userID, issue } = req.body;

  

  if(!(startingTime && endingTime && date && workSummary && userID)){
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const log = await logmodel.create({
      startingTime,
      endingTime,
      date,
      workSummary,
      userID,
      issue,
    });
    res.json({ message: "added successfully", log });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in adding log" });
  }
};

//delete log from the database
const deleteLog = async (req, res) => {
  const { logID } = req.body;
  console.log(logID);
  try {
    
    log=await logmodel.findByIdAndDelete(logID);
    console.log(log);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }
    else res.json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error in deleting log" });
  }
};

// get all logs of everyone in the system
const getlogs = async (req, res) => {
  try {
    Logs = await logmodel.find().sort({ createdAt: -1 }); //get all logs and sort them in descending order
    res.json({ message: "success", Logs });
  } catch (error) {
    res.status(400).json({ message: "Error in getting logs" });
  }
};


const getlogsbyuser = async (req, res) => {
  const { userID } = req.query;
  try {
    Logs = await logmodel.find({ userID }).sort({ createdAt: -1 }); //get all logs and sort them in descending order
    res.json({ success: true, Logs });
  } catch (error) {
    res.status(400).json({ message: "Error in getting logs" });
  }
};


const submitFeedback = async (req, res) => {
  const { logID, feedback } = req.body;
  try {
    const log = await logmodel.findOneAndUpdate(
      { _id: logID },
      { $set: {feedback} },
      { new: true }
    );
    // console.log(log);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    // Send a success response
    res.json({ message: "Feedback submitted successfully", log });
    console.log(log);
  } catch (error) {
    // Handle any errors
    res.status(400).json({ message: "Error in submitting feedback", error });
  }
};



module.exports = { AddLog, getlogs ,getlogsbyuser,deleteLog,submitFeedback};
