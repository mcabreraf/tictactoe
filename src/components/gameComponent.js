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
            stepNumber: 0,
            xIsNext: true
        };
    }
  
    handleClick(i) {
        if(this.state.enabled){
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
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
  
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    enableGame() {
        this.setState({
            enabled: !this.state.enabled
        })
    }

    restartGame() {
        this.setState({
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            enabled: false,
            stepNumber: 0,
            xIsNext: 1
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
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
  
        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-info">
                    <h3>Tic Tac Toe game!</h3>
                    <h4>Actual Game</h4>
                    <div>{status}</div>
                    <div style={{marginBottom: "10px", marginTop: "10px"}}></div>
                    <button onClick={() => this.enableGame()}>{play}</button>
                    <button onClick={() => this.restartGame()}>Restart</button>
                    <div style={{marginBottom: "10px", marginTop: "10px"}}></div>
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                    <ol>{moves}</ol>
                    <h4>Previous Games</h4>
                </div>
            </div>
      );
    }
}

export default Game;