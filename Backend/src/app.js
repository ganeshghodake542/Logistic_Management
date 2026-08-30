const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoute = require("../src/routes/user.route");
const cors = require("cors");
const userAuth = require("../src/middlewares/auth.middleware");


app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
];


app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));


app.use("/api/user", userRoute);


module.exports =app;