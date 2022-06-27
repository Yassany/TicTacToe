import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum GameStatus {
    Ongoing = 'ONGOING',
    P1won = 'PLAYER_1_WON',
    P2won = 'PLAYER_2_WON',
    draw = 'DRAW',
}

export type GameState = {
    turn: 'O' | 'X',
    status: GameStatus,
    board: Array<Array<' ' | 'O' | 'X'>>
}

const initialState: GameState = {
    turn: 'X',
    status: GameStatus.Ongoing,
    board: [
        [' ', ' ', ' ',],
        [' ', ' ', ' ',],
        [' ', ' ', ' ',],
    ]
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        // play 1 turn
        play: (state, action: PayloadAction<Array<number>>) => {
            const [y, x] = action.payload
            // check for valid play input
            if (
                state.board[y][x] !== ' '
                || !action.payload.every(n => [0, 1, 2].includes(n))
                || state.status !== GameStatus.Ongoing) {
                return
            }

            state.board[y][x] = state.turn
            if (state.turn === 'X') {
                state.turn = 'O'
            } else {
                state.turn = 'X'
            }
            state.status = checkEndGame(state.board)

        },
        reset: (state) => {
            state.turn = 'X'
            state.status = GameStatus.Ongoing
            state.board = [
                [' ', ' ', ' ',],
                [' ', ' ', ' ',],
                [' ', ' ', ' ',],
            ]
        }
    }
})

const checkEndGame = (board: Array<Array<' ' | 'O' | 'X'>>): GameStatus => {
    
    const winningCombinations = [
        [[0,0], [0,2], [0,1]],
        [[1,0], [1,2], [1,1]],
        [[2,0], [2,2], [2,1]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[2,0], [1,1], [0,2]],
    ]
    const winner = ['X', 'O']
        .find(sign => winningCombinations.some(
            combination => combination.every(([y, x]) => board[y][x] === sign)
        ))
    if (!winner) {
        if (board.every(row => row.every(square => square !== ' '))) {
            return GameStatus.draw
        }
        return GameStatus.Ongoing
    }
    if (winner === 'X') return GameStatus.P1won
    return GameStatus.P2won
}

export default gameSlice.reducer

export const { play, reset } = gameSlice.actions

export const selectBoard = (state: RootState) => state.game.board
export const selectTurn = (state: RootState) => state.game.turn
export const selectStatus = (state: RootState) => state.game.status