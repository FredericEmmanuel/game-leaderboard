// game-leaderboard/back-end/leaderboard.js
const express = require('express');
const cors = require('cors');
const AVLTree = require('./avlTree');

const app = express();
app.use(cors());
app.use(express.json());

let tree = new AVLTree();
let root = null;

app.post('/api/scores', (req, res) => {
    const { username, score } = req.body;
    root = tree.insert(root, username, parseInt(score));
    res.status(201).send({ message: "Player Added" });
});

app.get('/api/scores', (req, res) => {
    const scores = tree.getInOrder(root);
    res.json(scores);
});

app.delete('/api/scores/:username', (req, res) => {
    const { username } = req.params;
    root = tree.deleteByUsername(root, username); 
    res.status(200).send({ message: `User ${username} removed.` });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));