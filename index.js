const express = require('express');
const randomize = require('randomatic');
const bodyParser = require('body-parser');
const device = require('express-device');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const logger = require('morgan');
var passport = require('passport')
const Keyv = require('keyv');
const { KeyvFile } = require('keyv-file')
const session = require('express-session');
const randomstring = require("randomstring");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
var sass = require('node-sass');
const client = require("./oauth.js");
const mainRouter = require("./routes/index.js");
const app = express()
const port = 3000

// EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser());
app.use(device.capture());
device.enableViewRouting(app);

app.use('/', mainRouter);

// Page Routing
//Test Routing

// Css Routing
app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/views/assets/css/style.css')
});

// Javascript Routing
app.get('/script.js', (req, res) => {
  res.sendFile(__dirname + '/views/assets/js/script.js')
});

// Images Routing 
app.get('/images/banner1.png', (req, res) => {
  res.sendFile(__dirname + '/views/assets/images/banner1.png')
});
app.get('/images/botcmds.png', (req, res) => {
  res.sendFile(__dirname + '/views/assets/images/botcmds.png')
});
app.get('/images/commands.png', (req, res) => {
  res.sendFile(__dirname + '/views/assets/images/commands.png')
});
app.get('/images/notdev.png', (req, res) => {
  res.sendFile(__dirname + '/views/assets/images/notdev.png')
});
app.get('/images/redo.png', (req, res) => {
  res.sendFile(__dirname + '/views/assets/images/redo.png')
});
app.get('/images/retro.png', (req, res) => {
  res.sendFile(__dirname + '/views/assets/images/retro.png')
});
app.get('/images/s4dlogo.png', (req, res) => {
  res.sendFile(__dirname + '/views/assets/images/s4dlogo.png')
});
app.get('/images/what.png', (req, res) => {
  res.sendFile(__dirname + '/views/assets/images/what.png')
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
