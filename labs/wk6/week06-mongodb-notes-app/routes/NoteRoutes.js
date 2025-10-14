const express = require('express');
const noteModel = require('../models/NotesModel.js'); // ✅ Correct file name
const noteRoutes = express.Router();

noteRoutes.post('/notes', async (req, res) => {
    try {
        if (!req.body.content) {
            return res.status(400).send({ message: "Note content cannot be empty" });
        }

        const { noteTitle, noteDescription, priority, dateAdded, dateUpdated } = req.body.content;

        const note = new noteModel({
            noteTitle,
            noteDescription,
            priority,
            dateAdded,
            dateUpdated
        });

        const savedNote = await note.save();
        res.status(201).send(savedNote);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while creating the Note." });
    }
});

noteRoutes.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        res.status(200).send(notes);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving notes." });
    }
});

noteRoutes.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.noteId);
        if (!note) {
            return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
        }
        res.status(200).send(note);
    } catch (err) {
        res.status(500).send({ message: "Error retrieving note with id " + req.params.noteId });
    }
});

noteRoutes.put('/notes/:noteId', async (req, res) => {
    try {
        if (!req.body.content) {
            return res.status(400).send({ message: "Note content cannot be empty" });
        }

        const { noteTitle, noteDescription, priority, dateAdded, dateUpdated } = req.body.content;

        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            { noteTitle, noteDescription, priority, dateAdded, dateUpdated },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
        }

        res.status(200).send(updatedNote);
    } catch (err) {
        res.status(500).send({ message: "Error updating note with id " + req.params.noteId });
    }
});

noteRoutes.delete('/notes/:noteId', async (req, res) => {
    try {
        const deletedNote = await noteModel.findByIdAndRemove(req.params.noteId);
        if (!deletedNote) {
            return res.status(404).send({ message: "Note not found with id " + req.params.noteId });
        }
        res.status(200).send({ message: "Note deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: "Could not delete note with id " + req.params.noteId });
    }
});

module.exports = noteRoutes;
