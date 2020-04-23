// Built in Node.js
const path = require("path");
const fs = require("fs");
const util = require("util");
// npm installed
const express = require("express");
const uuid = require("uuid");

// exported file to import in server.js
let dbjson = require("./db/db.json");

const writeFileAsync = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// ===========================================================
app.get("/api/notes", function (req, res) {
  return res.json(dbjson);
});

app.post("/api/notes", async function (req, res) {
  let newNote = req.body;
  let id = uuid.v4();
  newNote.id = id;
  dbjson.push(newNote);
  try {
    await writeFileAsync("./db/db.json", JSON.stringify(dbjson));
    res.json(newNote);
  } catch (error) {
    res.json(error);
  }
});


app.delete("/api/notes/:id", async (req, res) => {
  let deleteNote = req.params.id;
  let filteredNotes = [];
  for (var i = 0; i < dbjson.length; i++) {
    if (deleteNote != dbjson[i].id) {
      filteredNotes.push(dbjson[i]);
    }
  }
  // (throws error if server crashes)
  try {
    await writeFileAsync("./db/db.json", JSON.stringify(filteredNotes));
    res.json(newNote);
  } catch (error) {
    res.json(error);
  }
  dbjson = filteredNotes;

  res.json({ ok: true });           
});

// Listener
// ===========================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

