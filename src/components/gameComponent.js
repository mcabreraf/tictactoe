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
            number: Object,
            previousGames: [],
            isPrev: false,
            gamesWonX: 0,
            gamesWonO: 0,
            gamesTied: 0
        };
        this.enableGame = this.enableGame.bind(this);
        this.newGame = this.newGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.showOldGame =  this.showOldGame.bind(this);
    }

    componentDidUpdate() {
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

    componentDidMount(){
        const previousGames = this.state.previousGames;
        let n = 0;
        let k = 0;
        previousGames.map(element => {
            const history = element.history.slice(0, element.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if(calculateWinner(squares) === "X") n++;
            if(calculateWinner(squares) === "O") k++;
        });
        this.setState({
            gamesWonByX: n,
            gamesWonByO: k
        })
    }

    gamesPlayed = () => {
        const cont = this.state.previousGames.length;
        return cont;
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
                    });
                    alert('Winner is X');
                }else if (calculateWinner(squares) === "O"){
                    this.setState({
                        finished: true,
                        gamesWonO: this.state.gamesWonO+1
                    })
                    alert('Winner is O');
                }else if(squares[i]){
                    this.setState({
                        finished: true,
                        gamesTied: this.state.gamesTied+1
                    })
                    alert('Its a draw!');
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
        }else{
            alert("Game is pause! Press on play to continue playing!")
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
        const savedGame = {
            history: this.state.history,
            enabled: this.state.enabled,
            finished: this.state.finished,
            stepNumber: this.state.stepNumber,
            xIsNext: this.state.xIsNext
        };
        console.log(savedGame);

        axios.post('http://localhost:5000/games/',savedGame)
        .then(res => alert("Last game was saved!"))
        .catch(err => console.log(err));

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
        const savedGame = {
            history: this.state.history,
            enabled: this.state.enabled,
            finished: this.state.finished,
            stepNumber: this.state.stepNumber,
            xIsNext: this.state.xIsNext
        };
        axios.put('http://localhost:5000/games/'+this.state.number,savedGame)
        .then((res) => alert("Game was saved!"))
        .catch(err => console.log(err));
    }

    render() {

        const history = this.state.history;
        const previousGames = this.state.previousGames;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const finished = this.state.finished;

        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            if(finished){
                return (
                    <li key={move}>
                        <button type="button" class="btn btn-outline-secondary btn-sm" disabled>{desc}</button>
                    </li>
                );
            }else{
                return (
                    <li key={move}>
                        <button type="button" class="btn btn-outline-secondary btn-sm" onClick={() => this.jumpTo(move)} disabled={!this.state.enabled}>{desc}</button>
                    </li>
                );
            }

        });

        const previous = previousGames.map(game => {
            return (
                <li key={game._id}>
                    <button type="button" class="btn btn-outline-dark btn-sm mybtnprev" onClick={() => this.showOldGame(game._id)} disabled={!this.state.enabled}>Game ID: {game._id}</button>
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

        const enableBut = this.state.enabled;

        let play
        if(enableBut){
            play = "Pause";
        }else{
            play = "Play";
            status = "Game is paused!"
        }

        return (
            <div className="game">
                <div className="game-info">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <h1>TIC TAC TOE GAME!</h1>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-3 d-flex justify-content-center">
                            <div>Games Played: {this.gamesPlayed()}</div>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                            <div>Games Won by X: {this.state.gamesWonX}</div>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                            <div>Games Won by O: {this.state.gamesWonO}</div>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                            <div>Games Tied: {}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <h4>Actual Game</h4>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <div>{status}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 align-self-center">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-success btn-sm" onClick={this.enableGame}>{play}</button>
                                <button type="button" class="btn btn-danger btn-sm" onClick={this.restartGame}>Restart</button>
                                <button type="button" class="btn btn-primary btn-sm" disabled={this.state.isPrev} onClick={this.newGame}>New game</button>
                                <button type="button"class="btn btn-secondary btn-sm" disabled={!this.state.isPrev} onClick={this.save}>Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="game-board">
                        <div className="col-12 d-flex justify-content-center">
                            <Board
                                squares={current.squares}
                                onClick={i => this.handleClick(i)}
                            />
                        </div>
                    </div>
                    <div className="row myrowgames">
                        <div className="col-6 d-flex justify-content-start">
                            <h5>Previous Moves</h5>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <h5>Previous Games</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-start">
                            <ol>{moves}</ol>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <ol>{previous}</ol>
                        </div>
                    </div>
                </div>
            </div>
      );
    }
}

export default Game;