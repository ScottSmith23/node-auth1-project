const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');


const usersRouter = require("../users/users-router.js");
const authenticator = require("../auth/authenticator.js");
const authRouter = require("../auth/auth-router.js");


const server = express();

const sessionConfig = {
  name: 'monster',
  secret: process.env.SESSION_SECRET || "keep secret!",
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie : {
    maxAge: 1000 * 60 * 10, //good for 10 mins in ms
    secure: process.env.USE_SECURE_COOKIES || false,
    httpOnly: true, 
  }
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", authenticator, usersRouter);
server.use("/api/",authRouter);
server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
