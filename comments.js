// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Path: comments.js
// Load comments from file
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error loading comments');
    }

    res.json(JSON.parse(data));
  });
});

// Path: comments.js
// Save comment to file
app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error saving comment');
    }

    const comments = JSON.parse(data);
    comments.push(req.body);

    fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving comment');
      }

      res.json(req.body);
    });
  });
});

// Path: comments.js
// Start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

// Path: comments.js
// Load comments from file
fs.readFile('./comments.json', 'utf8', (err, data) => {
  if (err) {
    return console.error('Error loading comments');
  }

  console.log(JSON.parse(data));
});