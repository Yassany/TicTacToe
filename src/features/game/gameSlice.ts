import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        play: (state, action: PayloadAction<Array<number>>) => {}
    }
})

export default gameSlice.reducer

export const { play } = gameSlice.actions