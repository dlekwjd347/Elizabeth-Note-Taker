// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const noteData = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuidv4");


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

    fs.readFile("../db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      console.log(data);
    });

    const notesInput = JSON.parse(data);
    notesInput.push(newNote)

    fs.writeFile('../db/db.json', JSON.stringify(notesInput, null, 2), (err) => {
      if (err) throw err;
      res.send(noteData);
      console.log('The note has been saved!');
    
      fs.writeFileSync(noteData, notesInput, 'utf-8')
    });

  })

  app.delete("/api/notes/:id", function (req, res) {
    //  below to get to the ID and reference it
    let noteId = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      let noteData = noteData.filter((e, i) => i != noteId);
   
      fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 2), err => {
        if (err) throw err;
        res.send(noteData)
        console.log("The note has been deleted!");
      });
    })
  })

  };