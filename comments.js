// Create a web server that handles comments using a REST API
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let comments = [];

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Add a new comment
app.post('/comments', (req, res) => {
    const { text } = req.body;
    if (text) {
        const newComment = { id: comments.length + 1, text };
        comments.push(newComment);
        res.status(201).json(newComment);
    } else {
        res.status(400).json({ error: 'Text is required' });
    }
});

// Delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(comment => comment.id === parseInt(id));
    
    if (index !== -1) {
        const deletedComment = comments.splice(index, 1);
        res.json(deletedComment);
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
