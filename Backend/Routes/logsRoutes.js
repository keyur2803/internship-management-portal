const express = require("express");
const { AddLog, getlogs, getlogsbyuser } = require("../controller/LogController");
const { getAllInterns } = require("../controller/AdminController");
const { register, login, deleteUser } = require("../controller/UserController");
const authMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/addlog", AddLog);
router.get("/getlogs", getlogs);
router.get("/getmylogs",getlogsbyuser);
router.get("/getAllinterns", getAllInterns);
router.delete("/deleteUser",deleteUser)

module.exports = router;
