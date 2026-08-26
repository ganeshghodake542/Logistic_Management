const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const register = async (req, res) => {
    const { email, name, password, role ,phone} = req.body;


    try {
        if (!name || !email || !password || !role ) {
            return res.json({
                success: false,
                message: "All feild are required"
            })
        }


        const allowedRoles = ["admin", "customer", "driver"];
        if (!allowedRoles.includes(role)) {
            return res.json({ success: false, message: "Invalid role" });
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
            role,
            phone
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
                role: user.role,
                number : user.phone
            }
        })


    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}



const login = async (req, res) => {


    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: " Email and passeword is required ",
            })
        }

const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid Credential"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Password is Incorrect"
            })
        }


        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("token", token);


        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                number : user.phone
            }
        })


    } catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }

}


const logout = async (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
}



const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({ user });


    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}



module.exports = { register, login, logout, me };