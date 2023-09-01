const express = require('express');
const app = express();
const cors = require("cors");
const userRouter = require('./routes/user.route');
require("./config/db");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get All User 
app.use("/api/users", userRouter);

// Home route Url 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/./views/index.html");
});

// route not found
app.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Server not found 
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "something is broken"
    });
});

module.exports = app;