import gameReducer, { GameState, GameStatus, play, reset } from './gameSlice';

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
    it('should set the player 1 winning with 3 X in a row', () => {
        const newState = gameReducer(initialState, play([0, 0]))
        expect(newState.status).toEqual(GameStatus.P1won)
    })
    it('should set the player 2 winning with 3 O in a row', () => {
        const newState = gameReducer({...initialState, turn: 'O'}, play([0, 0]))
        expect(newState.status).toEqual(GameStatus.P2won)
    })
    it('should end with draw when the board is filled', () => {
        const newState = gameReducer({
            ...initialState,
            board: [
                ['X', 'O', 'X',],
                ['O', 'O', 'X',],
                [' ', 'X', 'O',],
            ]
        }, play([2, 0]))
        expect(newState.status).toEqual(GameStatus.draw)
    })
    it('should reset the board', () => {
        const newState = gameReducer({...initialState, turn: 'O', status: GameStatus.draw}, reset())
        expect(newState.turn).toEqual('X')
        expect(newState.status).toEqual(GameStatus.Ongoing)
        expect(newState.board).toEqual([
            [' ', ' ', ' ',],
            [' ', ' ', ' ',],
            [' ', ' ', ' ',],
        ])
    })
})