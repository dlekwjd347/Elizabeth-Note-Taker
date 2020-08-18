// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

let noteData = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuidv4");
const path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    res.json(noteData);
  });

  app.post("/api/notes", function (req, res) {

    let noteId = uuid();
    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };

    notesData.push(newNote);

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesData), err => {
      if (err) { console.log(err) }
      res.send(newNote);
      console.log("The note has been saved!");
    
  })

  app.delete("/api/notes/:id", (req, res) => {
    let noteID = req.params.id;

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) { console.log(err) }
        const notesInput = JSON.parse(data);
        const filterNotes = notesInput.filter((note) => {
            return note.id !== noteID
        });


        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filterNotes), err => {
            if (err) { console.log(err) }
            console.log(filterNotes);
            res.send(filterNotes);
            console.log("The note has been deleted!")
      });
    })
  })

})
}
