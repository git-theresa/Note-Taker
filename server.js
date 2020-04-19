// Built in Node.js
const path = require("path");
const fs = require("fs");
const util = require("util");
// npm installed
const express = require("express");
const uuid = require("uuid");
// exported file to import in server.js
const dbjson= require("./db/db.json");
console.log(uuid);

// const readFileAsync = util.promisify(fs.readFile);
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
app.get("/api/notes", function(req, res) {
    return res.json(dbjson);
  });

  //  app.get("/api/notes", function(req, res){
  //   readFileAsync("./db/db.json", "utf8").then (data => {
  //   const notesJSON = JSON.parse(data)
  //   res.json(notesJSON)
  //   })
  //  });

    app.post("/api/notes", async function (req, res) {
     let newNote = req.body
    let id = uuid.v4()
    newNote.id = id
    console.log(id);
      // readFileAsync("./db/db.json", "utf8").then (data => {
      // const notesJSON = JSON.parse(data);
      dbjson.push(newNote);
    try {
      await writeFileAsync("./db/db.json", JSON.stringify(dbjson)); 
        res.json(newNote);
         } catch (error) {
      res.json(error)
    }
  }); 

  // promisify fsWritefile. This allows to use .then(which is a promise); therefore, await returns a promise. 
  // Async "Awaits" for the return. Await has to be in ans asyncronys function
  app.delete("/api/notes/:id", async function(req, res){
    let deleteNote=req.params.id;
    console.log(deleteNote);
    // use filter arrary es6 66-71
    let filteredArray = [];
    for(var i = 0; i < dbjson.length; i++){
      if (deleteNote !=dbjson[i].id){
        filteredArray.push(dbjson[i])
      }
      }
      // take place of .then (throws error if server crashes)
      try {
        await writeFileAsync("./db/db.json", JSON.stringify(filteredArray)); 
          res.json(newNote);
           } catch (error) {
        res.json(error)
      }
      dbjson=filteredArray;
      //  let  newNote = id(req.params.newNoteId).then(newNote => {
      //     if(!newNote) {
     
    res.json({ ok: true });g
  })
 


  // Listener
  // ===========================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });