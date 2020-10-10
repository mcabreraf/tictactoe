import React from "react";
import axios from "axios";
import Board from "./boardComponent";
import { calculateWinner } from "../calculateWinner";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
            {
                squares: Array(9).fill(null)
            }
            ],
            enabled: false,
            finished: false,
            stepNumber: 0,
            xIsNext: true,
            number: null,
            previousGames: [],
            isPrev: false,
            gamesPlayed: 1,
            gamesWonX: 0,
            gamesWonO: 0,
            gamesTied: 0
        };
        this.enableGame = this.enableGame.bind(this);
        this.newGame = this.newGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.showOldGame =  this.showOldGame.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/games/')
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    previousGames: res.data
                })
            }
        })
        .catch(err => console.log(err));
    }

    handleClick = (i) => {
        if(this.state.enabled && !this.state.finished){
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                if(calculateWinner(squares) === "X"){
                    this.setState({
                        finished: true,
                        gamesWonX: this.state.gamesWonX+1
                    })
                }else if (calculateWinner(squares) === "O"){
                    this.setState({
                        finished: true,
                        gamesWonO: this.state.gamesWonO+1
                    })
                }else if(squares[i]){
                    this.setState({
                        finished: true,
                        gamesTied: this.state.gamesTied+1
                    })
                }
                return;
            }
            squares[i] = this.state.xIsNext ? "X" : "O";
            this.setState({
                history: history.concat([
                {
                    squares: squares
                }
                ]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext
            });
        }
    }

    jumpTo = (step) => {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    enableGame = () => {
        this.setState({
            enabled: !this.state.enabled
        });
    }

    restartGame = () => {
        this.setState({
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            enabled: false,
            finished: false,
            stepNumber: 0,
            xIsNext: true,
            isPrev: false
        });
    }

    newGame = () => {
        this.inc_won();
        const savedGame = {
            history: this.state.history,
            enabled: this.state.enabled,
            finished: this.state.finished,
            stepNumber: this.state.stepNumber,
            xIsNext: this.state.xIsNext
        };
        console.log(savedGame);

        // const options = {
        //     method: 'post',
        //     body: JSON.stringify(savedGame),
        //     headers: {
        //       'Accept': 'application/json, text/plain, */*',
        //       'Content-Type': 'application/json'
        //     },
        // }
        // fetch('http://localhost:5000/games/', options)
        // .then(response => {
        //     console.log(response)
        //     if (response.ok) {
        //         return response.json();
        //       } else {
        //          throw new Error('Something went wrong ...');
        //       }
        //     })
        //       .then(data => console.log(data))
        //       .catch(error => console.log(error));

        axios.post('http://localhost:5000/games/',savedGame)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        this.setState({
            number: this.state.number + 1,
            previousGames: this.state.previousGames.concat([savedGame]),
            gamesPlayed: this.state.gamesPlayed+1
        });
        this.restartGame();
    }

    showOldGame = (id) => {
        axios.get('http://localhost:5000/games/'+id)
        .then(res => {
            this.setState({
                history: res.data.history,
                enabled: res.data.enabled,
                finished: res.data.finished,
                stepNumber: res.data.stepnumber,
                xIsNext: res.data.xisnext,
                number: res.data._id,
                isPrev: true
            })
        })
        .catch(err => console.log(err));

    }

    save = () => {
        const prevGames = this.state.previousGames;
        const pos = prevGames.findIndex(game => game._id === this.state.number);
        const savedGame = {
            history: this.state.history,
            enabled: this.state.enabled,
            finished: this.state.finished,
            stepNumber: this.state.stepNumber,
            xIsNext: this.state.xIsNext
        };
        axios.put('http://localhost:5000/games/'+this.state.number,savedGame)
        .then((res) =>  console.log(res))
        .catch(err => console.log(err));
        prevGames[pos] = savedGame;
        this.setState({
            previousGames: prevGames
        })
    }

    inc_pla = () => {
        this.setState({
            gamesPlayed: this.state.gamesPlayed+1
        })
    }

    inc_won = () => {
        this.setState({
            gamesWon: this.state.gamesWon+1
        })
    }

    inc_tie = () => {
        this.setState({
            gamesTied: this.state.gamesTied+1
        })
    }

    render() {

        const enableBut = this.state.enabled;

        let play
        if(enableBut){
            play = "Pause";
        }else{
            play = "Play";
        }

        const history = this.state.history;
        const previousGames = this.state.previousGames;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const finished = this.state.finished;
        const gWonX = this.state.gamesWonX;
        const gWonO = this.state.gamesWonO;
        const gPla = this.state.gamesPlayed;
        const gTied = this.state.gamesTied;

        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            if(finished){
                return (
                    <li key={move}>
                        <button disabled>{desc}</button>
                    </li>
                );
            }else{
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }

        });

        const previous = previousGames.map(game => {
            return (
                <li key={game._id}>
                    <button  onClick={() => this.showOldGame(game._id)}>Game ID: {game._id}</button>
                </li>
            );
        })

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else if(!winner && finished) {
            status = "Draw!"
        } else{
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-info">
                    <h3>Tic Tac Toe game!</h3>
                    <h4>Actual Game</h4>
                    <div>{status}</div>
                    <div>Games Played: {gPla}</div>
                    <div>Games Won by X: {gWonX}</div>
                    <div>Games Won by O: {gWonO}</div>
                    <div>Games Tied: {gTied}</div>
                    <div style={{marginBottom: "10px", marginTop: "10px"}}></div>
                    <button onClick={this.enableGame}>{play}</button>
                    <button onClick={this.restartGame}>Restart</button>
                    <button disabled={this.state.isPrev} onClick={this.newGame}>New Game</button>
                    <button disabled={!this.state.isPrev} onClick={this.save}>Save</button>
                    <div style={{marginBottom: "10px", marginTop: "10px"}}></div>
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                    <ol>{moves}</ol>
                    <h4>Previous Games</h4>
                    <ol>{previous}</ol>
                </div>
            </div>
      );
    }
}

export default Game;