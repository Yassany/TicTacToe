import gameReducer, { GameState, GameStatus, play } from './gameSlice';

describe('game state', () => {
    const initialState: GameState = {
        turn: 'X',
        status: GameStatus.Ongoing,
        board: [
            [' ', 'X', 'X',],
            [' ', 'O', ' ',],
            [' ', ' ', 'O',],
        ]
    }
    it('should have initial state', () => {
        expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
            turn: 'X',
            status: 'ONGOING',
            board: [
                [' ', ' ', ' ',],
                [' ', ' ', ' ',],
                [' ', ' ', ' ',],
            ]
        })
    })
    it('should change player after 1 turn', () => {
        const newState = gameReducer(initialState, play([2, 1]))
        expect(newState.turn).toEqual('O')
    })
    it('should set player sign on the right case after 1 turn', () => {
        const newState = gameReducer(initialState, play([2, 1]))
        expect(newState.board[2][1]).toEqual('X')
    })
    it('should not change 1 set sign', () => {
        const newState = gameReducer(initialState, play([1, 1]))
        expect(newState.turn).toEqual('X')
        expect(newState.board[1][1]).toEqual('O')
    })
})