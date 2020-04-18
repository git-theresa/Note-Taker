// Built in Node.js
const path = require("path");
const fs = require("fs");
const util = require("util");
// npm installed
const express = require("express");
const uuid = require("uuid");
// exported file to import in server.js
const dbjson = require("./db/db.json");


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(express.static("public"));


// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// ===========================================================
// app.get("/api/notes", function(req, res) {
//     return res.json(dbjson);
//   });

   app.get("/api/notes", function(req, res){
    readFileAsync("./db/db.json", "utf8").then (data => {
    const notesJSON = JSON.parse(data)
    res.json(notesJSON)
    })
   });

    app.post("/api/notes", function (req, res) {
     let newNote = req.body
    id = uuid.v4
    note.id = `${id}` 
      readFileAsync("./db/db.json", "utf8").then(data =>{
      const notesJSON = JSON.parse(data);
      notesJSON.push(newNote);
    
        writeFileAsync("./db/db.json", JSON.stringify(notesJSON)).then(() => {
        res.json(newNote);
        })
    })
  }); 

  app.delete("/api/notes/:id", function(req, res){
    dbjson.delete(req.body);
    dbjson.length = 0;
    res.json({ ok: true });
  });


  // Listener
  // ===========================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });