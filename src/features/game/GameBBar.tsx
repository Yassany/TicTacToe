import React from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { GameStatus, selectStatus, selectTurn } from "./gameSlice";

export function GameBBar() {
    const turn = useAppSelector(selectTurn)
    const status = useAppSelector(selectStatus)
    const dispatch = useAppDispatch()
    return (
        <div>
            <div>
                <p>turn : Player {turn === 'X' ? '1' : '2'}</p>
                <p>
                    Game : {
                        (() => {
                            switch(status) {
                                case GameStatus.Ongoing:
                                    return 'Ongoing'
                                case GameStatus.P1won:
                                    return 'Player 1 won'
                                case GameStatus.P2won:
                                    return 'Player 2 won'
                                case GameStatus.draw:
                                    return 'Draw'
                        }
                    })()
                    }
                </p>
            </div>
        </div>
    )
}