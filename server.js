const express = require('express');
const fs = require('fs');
const path = require('path');
// Helper method for generating unique ids (for notes)
const uuid = require('./helpers/uuid');

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
        console.error(err);
    } else {
      // Convert string into JSON object
      const savedNotes = JSON.parse(notes);
      savedNotes.push(newNote);
    };
);

// POST Route to save new note, add to DB file, and return new note to client 
// app.post('/api/notes', (req, res) =>

// );

// DELETE Route to delete note using the noteID from page and DB - BONUS
// app.delete('/api/notes/:id')



// Connecting app to localhost
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);