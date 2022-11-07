const express = require('express');
const fs = require('fs');
const path = require('path');

// Helper method for generating unique ids (for notes)
// const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and url encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route to return all saved notes as JSON
app.get('/api/notes', (req, res) => 
   // Obtain existing notes
  fs.readFile('./db/db.json', 'utf8', (err, notes) => {
    if (err) {
        console.err(err);
    } else {
    // Convert string into JSON object
    const savedNotes = JSON.parse(notes);
    res.json(savedNotes)
    }
  })
);

// POST Route to save new note, add to DB file, and return new note to client 
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.log('request recieved to add a new note');
    // Destructuring assignment for the items in req.body - title and text come from db.json
    const { title, text } = req.body
    // If all the required properties are present, create a new note
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        }
    fs.readFile('./db.db.json', 'utf8', (err, note) => {
        if (err) {
            console.error(err);
        } else {
        const parsedNotes = JSON.parse(note);
        parsedNote.push(newNote);

        fs.writeFile(
            './db/notes.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
            writeErr 
                ? console.error(writeErr)
                : console.info ('note added successfully!')
        );
        };
    });
    const response = {
        status: 'success',
        body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting new note')
    }
});

// BONUS - DELETE Route to delete note using the noteID from page and DB
// app.delete('/api/notes/:id')

// Connecting app to localhost
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);