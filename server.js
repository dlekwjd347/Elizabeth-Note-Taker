const express = require("express");
const path = require('path');
const uuid = require('uuidv4');
// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;
// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//Require routes file
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
// Setup listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
}); 