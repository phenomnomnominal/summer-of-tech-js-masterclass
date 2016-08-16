class Board extends React.Component {
    constructor (props) {
        super();
        this.state = {
            gameState: props.gameState,
            token: props.token
        };
    }

    componentWillReceiveProps (nextProps) {
        this.setState({ gameState: nextProps.gameState });
    }

    getBoardState (gameState) {
        let { moves, players, whoseTurn } = gameState;

        let boardState = [null, null, null, null, null, null, null, null, null];
        let otherPlayer = players.find(player => {
            // Hack ahoy!
            return JSON.stringify(player) !== JSON.stringify(whoseTurn);
        });

        let reversedMoves = moves.slice(0).reverse();
        reversedMoves.map((move, i) => {
            boardState[move] = i % 2 === 0 ? otherPlayer.symbol : whoseTurn.symbol;
        });
        return boardState;
    }

    render () {
        let { gameState, token } = this.state;

        let { whoseTurn } = this.state.gameState;
        let boardState = this.getBoardState(this.state.gameState);
        return (
            <div>
                <h2>Next move: {whoseTurn.name}</h2>
                <button onClick={() => this.takeTurn(0)}>{boardState[0]}</button>
                <button onClick={() => this.takeTurn(1)}>{boardState[1]}</button>
                <button onClick={() => this.takeTurn(2)}>{boardState[2]}</button>
                <br/>
                <button onClick={() => this.takeTurn(3)}>{boardState[3]}</button>
                <button onClick={() => this.takeTurn(4)}>{boardState[4]}</button>
                <button onClick={() => this.takeTurn(5)}>{boardState[5]}</button>
                <br/>
                <button onClick={() => this.takeTurn(6)}>{boardState[6]}</button>
                <button onClick={() => this.takeTurn(7)}>{boardState[7]}</button>
                <button onClick={() => this.takeTurn(8)}>{boardState[8]}</button>
            </div>
        );
    }

    takeTurn (move) {
        let { token } = this.state;
        if (token) {
            fetch('/take-turn', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ move, token })
            })
            .then(response => response.json())
            .then(data => {
                let { message } = data;
                if (message) {
                    alert(message);
                }
            });
        }
    }
}
window.Board = Board;
