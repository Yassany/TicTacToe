import React from "react";
import styles from './Game.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { play, selectBoard } from "./gameSlice";

export function Game() {
    const board = useAppSelector(selectBoard)
    const dispatch = useAppDispatch()
    return (
        <div>
            {board.map((row, i) => (
                <div className={styles.rows}>
                    {row.map((column, j) => (
                        <button className={styles.column} onClick={() => dispatch(play([i, j]))}>
                            &nbsp;{column}&nbsp;
                            </button>
                    ))}
                </div>
            ))}
        </div>
    )
}