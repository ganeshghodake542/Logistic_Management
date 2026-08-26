const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoute = require("../src/routes/user.route");
const userAuth = require("../src/middlewares/auth.middleware");


app.use(express.json());
app.use(cookieParser());



app.use(express.urlencoded({ extended: true }));


app.use("/api/user", userRoute);


module.exports =app;