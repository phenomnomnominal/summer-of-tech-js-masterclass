class TicTacToe extends React.Component {
    constructor () {
        super();
        this.state = {
            gameState: {
                players: []
            },
            token: null
        };
    }

    componentDidMount () {
        this.loadGameState();
        setInterval(() => this.loadGameState(), 1000);
    }

    loadGameState () {
        fetch('/game-state')
        .then(response => response.json())
        .then(gameState => this.setState({ gameState }));
    }

    setToken (token) {
        this.state.token = token;
    }

    render () {
        let { gameState, token } = this.state;

        let gameIsEmpty = gameState.players.length === 0;
        let waitingForPlayer = gameState.players.length === 1;
        let gameIsFull = gameState.players.length === 2;
        let gameIsUnderway = gameIsFull && gameState.whoseTurn;
        let gameIsWon = gameIsFull && !gameState.whoseTurn && gameState.winner;
        let gameIsDrawn = gameIsFull && !gameState.whoseTurn && !gameState.winner;

        if (!token && !gameIsFull) {
            return <JoinGame onJoinGame={token => this.setToken(token)}/>
        }
        if (token && waitingForPlayer) {
            return <h2>Waiting for player...</h2>
        }

        if (gameIsUnderway) {
            return <Board token={token} gameState={gameState}></Board>
        }

        if (gameIsWon) {
            return <h2>{gameState.winner.name} won!</h2>
        }
        if (gameIsDrawn) {
            return <h2>Draw!</h2>
        }
    }
}
window.TicTacToe = TicTacToe;
