import React from "react";
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
            number: 0,
            previousGames: [],
            isPrev: false
        };
        this.enableGame = this.enableGame.bind(this);
        this.newGame = this.newGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.showOldGame =  this.showOldGame.bind(this);
    }
  
    handleClick = (i) => {
        if(this.state.enabled){
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                this.setState({
                    finished: true
                })
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
        const savedGame = {
            history: this.state.history,
            enabled: this.state.enabled,
            finished: this.state.finished,
            stepNumber: this.state.stepNumber,
            xIsNext: this.state.xIsNext,
            number: this.state.number,
        };
        this.setState({
            number: this.state.number + 1,
            previousGames: this.state.previousGames.concat([savedGame])
        });
        this.restartGame();
    }

    showOldGame = (game) => {
        this.setState({
            history: game.history,
            enabled: game.enabled,
            finished: game.finished,
            stepNumber: game.stepNumber,
            xIsNext: game.xIsNext,
            number: game.number,
            isPrev: true
        })
    }

    save = () => {
        document.getElementsByClassName("newgame").disabled = true;
        const prevGames = this.state.previousGames;
        const pos = prevGames.findIndex(game => game.number === this.state.number);
        const savedGame = {
            history: this.state.history,
            enabled: this.state.enabled,
            finished: this.state.finished,
            stepNumber: this.state.stepNumber,
            number: this.state.number,
            xIsNext: this.state.xIsNext,
            isPrev: this.state.isPrev
        };
        prevGames[pos] = savedGame;
        this.setState({
            previousGames: prevGames
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
                <li key={game.number}>
                    <button onClick={() => this.showOldGame(game)}>Game #{game.number}</button>
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