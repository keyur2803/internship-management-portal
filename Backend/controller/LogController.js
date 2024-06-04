const logmodel = require("../models/Logmodel");


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

module.exports = { AddLog, getlogs ,getlogsbyuser};
