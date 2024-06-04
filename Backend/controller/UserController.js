const Usermodel = require("../models/Usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { name, email, password, role ,field } = req.body;
    try {
        if (!(name && email && password && role && field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const exstingUser = await Usermodel.findOne({ email });
        if (exstingUser) {
            return res.status(401).json({ message: "User already exists with this email" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await Usermodel.create({
            name,
            email,
            password: encryptedPassword,
            role,
            field,
        });
        if (user) {
            const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;
           return res.status(201).json({ user, message: "User created successfully" });
        } else {
            return res.status(400).json({ message: "User creation failed" });
        }
    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password, role } = req.body;

    if (!(email && password && role)) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Usermodel.findOne({ email });
    if (user) {
        const isRoleMatched = user.role === role;
        if (!isRoleMatched) {
            return res.status(400).json({ message: "Invalid role access" });
        }
        const isPasswordMached = await bcrypt.compare(password, user.password);
        if (isRoleMatched && isPasswordMached) {
            user.password = undefined;
            const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "2h",
            });
            user.token = token;
            res.status(200).json({ user});
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } else {
       return res.status(400).json({ message: "user is not registered" });
    }
};


module.exports = { register, login };
