import bodyParser from 'body-parser';
import express from 'express';
import GameState from './game-state';

let app = express();
let gameState = new GameState();

app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/join-game', (req, res) => {
    let { name, symbol } = req.body;

    try {
        let token = gameState.addPlayer({ name, symbol });
        res.status(200).json({ token });
    } catch (e) {
        let { message } = e;
        res.status(400).json({ message });
    }
});

app.post('/take-turn', (req, res) => {
    let { move, token } = req.body;

    try {
      gameState.addMove({ move, token });
      res.status(200).end();
    } catch (e) {
        let { message } = e;
        res.status(400).json({ message });
    }
});

app.get('/game-state', (req, res) => {
    res.json(gameState);
});

const server = app.listen(3000, () => {
    console.log(`Server is running on port ${server.address().port}!`);
});
