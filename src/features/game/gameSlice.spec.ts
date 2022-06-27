import gameReducer from './gameSlice';

describe('game state', () => {
    it('should have initial state', () => {
        expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
            turn: 'O',
            status: 'ongoing',
            board: [
                [' ', ' ', ' ',],
                [' ', ' ', ' ',],
                [' ', ' ', ' ',],
            ]
        })
    })
})