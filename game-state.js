import crypto from 'crypto';

import WinChecker from './win-checker';
let winChecker = new WinChecker();

const TOKENS = [];

export default class GameState {
    constructor () {
        this.players = [];
        this.moves = [];
        this.whoseTurn = null;
        this.winner = null;
    }

    addPlayer (player) {
        if (!player.name) {
            throw new Error('Invalid player: no name');
        }
        if (!player.symbol) {
            throw new Error('Invalid player: no symbol');
        }

        if (('' + player.symbol).length !== 1) {
            throw new Error('Invalid player: symbol should be a single character');
        }
        if (this.players.length === 2) {
            throw new Error('This game is already full');
        }

        if (this.players.length < 2) {
            this.players.push(player);
        }
        if (this.players.length === 2) {
            this.whoseTurn = this.players[Math.floor(Math.random() * 2)];
        }

        let token = crypto.randomBytes(64).toString('hex');
        TOKENS.push(token);
        return token;
    }

    addMove (turn) {
        let { move, token } = turn;

        if (!token || TOKENS[this.players.indexOf(this.whoseTurn)] !== token) {
            throw new Error('Invalid turn: it is not your turn');
        }
        if (isNaN(+move) || move < 0 || move > 8) {
            throw new Error('Invalid turn: move should be a number from 0 to 8');
        }
        if (this.moves.indexOf(move) > -1) {
            throw new Error('Invalid turn: that space is already taken');
        }

        if (this.players.length < 9) {
            this.moves.push(move);
        }

        let win = winChecker.checkWin(this);
        if (win) {
            this.winner = this.whoseTurn;
            this.whoseTurn = null;
        } else {
            this.whoseTurn = this.players.find(player => player !== this.whoseTurn);
        }

        if (!win && this.moves.length === 9) {
            this.winner = null;
            this.whoseTurn = null;
        }
    }
}
