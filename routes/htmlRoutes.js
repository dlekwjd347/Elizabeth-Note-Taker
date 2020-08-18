
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html

var path = require("path");

// ROUTING

module.exports = function(app) {
  // HTML GET Requests
  
  // If no matching route is found default to home
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public\notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};