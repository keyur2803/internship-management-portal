const { header } = require("express-validator");
const Usermodel = require("../models/Usermodel");


const getAllInterns= async (req, res) => {
    try {
        
        const interns = await Usermodel.find({role:"intern"},{password:0},{sort: {createdAt: -1}});
        return res.status(200).json({success: true, interns, message: "All Interns"});
    } catch (error) {
        return res.status(400).json({message: "Error in getting all interns"});
    }

}


module.exports = {getAllInterns};