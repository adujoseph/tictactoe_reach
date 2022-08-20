import React, { useState, useEffect } from 'react';
import './Game.css';
import { unsafeAllowMultipleStdlibs, loadStdlib, ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';

const stdlib = loadStdlib(process.env);

const TicTacToe = () => {

    const [turn, setTurn] = useState('x');
    const [cells, setCells] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [isDraw, setDraw] = useState(false);
    const [setView, getSetView] = useState('player1')
    const [firstPlayer, setFirstPlayer] = useState();
    const [secondPlayer, setSecondPlayer] = useState();
    const [wager, setWager] = useState();

    // const acc =  stdlib.getDefaultAccount();
    // console.log(acc, 'see account')

    useEffect(() => {
        //stdlib.setWalletFallback({make : () => 'ALGO'});
        // await stdlib.getProvider();
        stdlib.setWalletFallback(stdlib.walletFallback({
            providerEnv: 'TestNet', MyAlgoConnect
        }));
    }, [])


    // console.log(stdlib, 'something');

    const checkDraw = () => {
        const checkfill = cells.filter(f => f != null);

        if ((checkfill.length === 8) && (winner === null)) {
            setDraw(true)
        }
    }

    const checkForWinner = (squares) => {
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6],
            ],
        };

        for (let combo in combos) {
            combos[combo].forEach((pattern) => {
                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ) {
                    // do nothing
                    // console.log('it is a draw')
                } else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]]);
                } else {

                }
            });
        }
    };

    const handleClick = (num) => {
        let squares = [...cells];
        if (cells[num] !== null) {
            alert('already clicked');
            return;
        }

        if (winner != null) {
            alert('Game Over, Restart')
            return
        }


        if (turn === 'x') {
            squares[num] = 'x';
            setTurn('o');
        } else {
            squares[num] = 'o';
            setTurn('x');
        }
        checkForWinner(squares);
        setCells(squares);
        checkDraw()
    };

    const handleRestart = () => {
        setCells(Array(9).fill(null));
        setDraw(false)
        setWinner(null);

    };

    const Cell = ({ num }) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
    };

    const handlePlayer = (arg) => {
        if (arg === '1') {
            getSetView('player2')
        } else if (arg === '2') {
            getSetView('game')
        }
    }

    const Welcome = () => {
        return (
            <div>
                <h1>Welcome to Player One</h1>
                <p>Pls Introduce yourself</p>
                <input name="name" placeholder='Enter your name' type='text' onChange={(e) => setFirstPlayer(e.target.value)} value={firstPlayer} />
                <input name="wager" placeholder='Enter wager' type='number' onChange={(e) => setWager(e.target.value)} value={wager} />
                <button onClick={() => handlePlayer("1")}>Access Game</button>
            </div>
        )
    }

    const AddParticipant = () => {
        return (
            <div>
                <h1>Welcome to Player Two</h1>
                <p>Pls Introduce yourself</p>
                <input name="name" placeholder='Enter your name' type='text' onChange={(e) => setSecondPlayer(e.target.value)}  value={secondPlayer}/>
                <input name="wager" placeholder='Enter wager'type='number' onChange={(e) => setWager(e.target.value)}  value={wager} />
                <button onClick={() => handlePlayer("2")}>Access Game</button>
            </div>
        )
    }

    const PlayGame = () => {
        return (
            <div className='container'>
                <table>
                    Turn: {`${turn === 'x' ? firstPlayer : secondPlayer}`}
                    <tbody>
                        <tr>
                            <Cell num={0} />
                            <Cell num={1} />
                            <Cell num={2} />
                        </tr>
                        <tr>
                            <Cell num={3} />
                            <Cell num={4} />
                            <Cell num={5} />
                        </tr>
                        <tr>
                            <Cell num={6} />
                            <Cell num={7} />
                            <Cell num={8} />
                        </tr>
                    </tbody>
                </table>
                {isDraw && (
                    <>
                        <p>A draw, want to play again ?</p>
                        <button onClick={() => handleRestart()}>Play Again</button>
                    </>
                )}
                {winner && (
                    <>
                        <p>{`${winner === 'x' ? firstPlayer : secondPlayer} is the winner`}</p>
                        <button onClick={() => handleRestart()}>Play Again</button>
                    </>
                )}
            </div>
        );
    }



    return (
        <div>
            {setView === 'player1' && (Welcome())}
            {setView === 'player2' && (AddParticipant())}
            {setView === 'game' && (PlayGame())}
        </div>
    );
};

export default TicTacToe;