// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources
// ===============================================================================

let notesData = require("../db/db.json");
const fs = require("fs");
const { uuid } = require("uuidv4");
const path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    });

    app.post("/api/notes", function (req, res) {
        let noteID = uuid();
        let newNote = {
            id: noteID,
            title: req.body.title,
            text: req.body.text
        };

        notesData.push(newNote);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesData), err => {
            if (err) { console.log(err) }
            res.send(newNote);
            console.log("The Note has been saved!");

        });
    });


    app.delete("/api/notes/:id", (req, res) => {
        let noteID = req.params.id;

        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) { console.log(err) }
            let notesInput = JSON.parse(data);
            notesData = notesInput.filter((note) => {
                return note.id !== noteID
            });


            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesData), err => {
                if (err) { console.log(err) }
                console.log(notesData);
                res.send(notesData);
                console.log("The note has been deleted!")
            });
        });
    });
};