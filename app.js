require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();
const auth = require('./routes/auth')
const verifyToken = require('./middleware/auth')



app.use(express.json());
app.use('/', auth)
app.use('/', verifyToken)



module.exports = app;
