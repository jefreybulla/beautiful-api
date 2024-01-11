const {JsonDB, Config} = require("node-json-db");
const express = require("express");

const app = express();

app.use(express.json());

const db = new JsonDB(new Config("db", true, true, '/'));

app.get("/", (req, res) => {
    res.status(200).json("Hello World");
})

app.post("/notes", async (req, res) => {
    console.log('adding a note -->>>')
    const {title, content} = req.body;
    const id = db.getData("/notes").length ?? 0;
    await db.push(`/notes[${id}]`, {title, content});
    res.status(201).json("Note created");
})

app.get("/notes", async (req, res) => {
    console.log('getting notes -->>>')
    const notes = await db.getData("/notes");
    res.status(200).json(notes);
})

app.get("/notes/:id", async (req, res) => {
    const {id} = req.params;
    const note = await db.getData(`/notes[${parseInt(id)}]`);
    res.status(200).json(note);
})

app.put("/notes/:id", async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;
    await db.push(`/notes[${parseInt(id)}]`, {title, content});
    res.status(200).json("Note updated");
})

app.delete("/notes/:id", async (req, res) => {
    const {id} = req.params;
    await db.delete(`/notes[${parseInt(id)}]`);
    res.status(200).json("Note deleted");
})

module.exports = app;
