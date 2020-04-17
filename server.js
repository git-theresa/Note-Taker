const express = require("express");
const path = require("path");
const dbjson = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(express.static("public"));

let notes = [];
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

   app.post("/api/notes", function(req, res){
    dbjson.push(req.body);
      res.json(newNote);
  });
  app.delete("/api/notes", function(req, res){
    dbjson.delete(req.body);

    dbjson.length = 0;

    res.json({ ok: true });
  });
 
  // 
 
  //    var newNote = req.body;

  // var readonly = req.params.notes;
  // for (var i = 0; i < noteList.length; i++) {
  //   if (readonly === notes[i]) {
  //     return res.json(notes[i]);
  //   }
  // }


  // Listener
  // ===========================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });