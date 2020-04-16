var express = require("express");
var path = require("path");
var dbjson = require("./db/db.json");

var app = express();
var PORT = 3000;

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
   app.post("/api/notes", function(req, res){
    dbjson.push(req.body);
      res.json(newNote);
  });
  app.delete("/api/notes", function(req, res){
    dbjson.delete(req.body);
  });
 
  // 
  app.put("/api/notes", function(req, res){
    dbjson.save(req.noteList);
  });
     // var newNote = req.body;

  // var readonly = req.params.notes;
  // for (var i = 0; i < noteList.length; i++) {
  //   if (readonly === notes[i]) {
  //     return res.json(notes[i]);
  //   }
  // }
// 

  // Listener
  // ===========================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });