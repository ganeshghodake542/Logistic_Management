const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const register = async(req, res) => {
    const {email , name , password} = req.body;


     try {
        if (!name || !email || !password || !role) {
            return res.json({
                success: false,
                message: "All feild are required"
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: " Email already exist"
            })
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hash,
            role
        })

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })


    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}