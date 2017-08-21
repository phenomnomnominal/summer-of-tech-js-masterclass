class JoinGame extends React.Component {
    constructor (props) {
        super();
        this.props = props;
        this.state = {
            name: '',
            symbol: ''
        };
    }

    handleNameChange (e) {
        this.setState({ name: e.target.value });
    }

    handleSymbolChange (e) {
        this.setState({ symbol: e.target.value });
    }

    joinGame (e) {
        e.preventDefault();

        fetch('/join-game', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {
            let { message, token } = data;
            if (message) {
                alert(message);
            } else {
                this.props.onJoinGame(token)
            }
        });
    }

    render () {
        return (
            <form onSubmit={e => this.joinGame(e)}>
                <h2>Join game:</h2>
                <label>Name:</label>
                <br/>
                <input
                  type="text"
                  placeholder="Your name"
                  value={this.state.name}
                  onChange={e => this.handleNameChange(e)}
                />
                <br/>
                <label>Symbol:</label>
                <br/>
                <input
                  type="text"
                  placeholder="X"
                  value={this.state.symbol}
                  onChange={e => this.handleSymbolChange(e)}
                />
                <br/>
                <input type="submit" value="Join"/>
            </form>
        );
    }
}
window.JoinGame = JoinGame;
