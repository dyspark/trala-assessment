const {
    getColorScore,
    scoreHotshotGame,
} = require('./index');

describe('getColorScore', () => {
    it('should throw an error for invalid color(s)', () => {
        expect(() => getColorScore('purple1')).toThrow();
    });

    it('should return the correct color', () => {
        const color = getColorScore('green1');
        expect(color).toBe('green');
    });
});

describe('scoreHotshotGame', () => {
    const validGame1 = [
        {
            'made_shots': ['green1', 'gray2', 'red2'],
            'attempted_shots': ['green1', 'gray2', 'blue2', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2', 'blue1'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'blue2', 'red1', 'blue2', 'gray2', 'gray1', 'red2', 'blue1'],
            'attempted_shots': ['green1', 'yellow1', 'blue2', 'red1', 'blue2', 'gray2', 'gray1', 'red2', 'blue1'],
            'made_GOAT_shots': ['green1', 'yellow1', 'gray2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'blue2', 'red2'],
            'attempted_shots': ['green1', 'yellow1', 'blue2', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue2', 'red2']
        },
        {
            'made_shots': ['red2', 'green1', 'blue1', 'red2', 'red1'],
            'attempted_shots': ['red2', 'green1', 'blue1', 'red2', 'red1', 'green1']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red1'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red1']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2', 'blue2'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray1', 'blue2', 'red2'],
            'attempted_shots': ['green1', 'yellow1', 'gray1', 'blue2', 'red2']
        },
    ];
    const validGame2 = [
        {
            'made_shots': ['green1', 'green1', 'green1', 'green1', 'green1', 'red1', 'red1', 'yellow1', 'yellow1', 'yellow1', 'blue1', 'gray1', 'gray2'],
            'attempted_shots': ['green1', 'green1', 'green1', 'green1', 'green1', 'green1', 'green1', 'red1', 'red1', 'yellow1', 'yellow1', 'yellow1', 'yellow1', 'yellow1', 'gray1', 'gray2', 'blue1', 'blue2'],
            'made_heatcheck_shots': ['green1', 'yellow1', 'green1']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2', 'blue1'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'blue2', 'red1', 'blue2', 'gray2', 'gray1', 'red2', 'blue1'],
            'attempted_shots': ['green1', 'yellow1', 'blue2', 'red1', 'blue2', 'gray2', 'gray1', 'red2', 'blue1'],
            'made_GOAT_shots': ['green1', 'yellow1', 'gray2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'blue2', 'red2'],
            'attempted_shots': ['green1', 'yellow1', 'blue2', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue2', 'red2']
        },
        {
            'made_shots': ['red2', 'green1', 'blue1', 'red2', 'red1'],
            'attempted_shots': ['red2', 'green1', 'blue1', 'red2', 'red1', 'green1']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red1'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red1']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2', 'blue2'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray1', 'blue2', 'red2'],
            'attempted_shots': ['green1', 'yellow1', 'gray1', 'blue2', 'red2']
        },
    ];
    const invalidGame = [
        {
            'made_shots': ['green1', 'yellow1', 'gray2', 'blue1'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'blue2', 'red1', 'blue2', 'gray2', 'gray1', 'red2', 'blue1'],
            'attempted_shots': ['green1', 'yellow1', 'blue2', 'red1', 'blue2', 'gray2', 'gray1', 'red2', 'blue1'],
            'made_bonus_shots': ['green1', 'yellow1', 'gray2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'blue2', 'red2'],
            'attempted_shots': ['green1', 'yellow1', 'blue2', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue2', 'red2']
        },
        {
            'made_shots': ['red2', 'green1', 'blue1', 'red2', 'red1'],
            'attempted_shots': ['red2', 'green1', 'blue1', 'red2', 'red1', 'green1']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red1'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red1']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue1', 'red2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray2', 'blue2'],
            'attempted_shots': ['green1', 'yellow1', 'gray2', 'blue2']
        },
        {
            'made_shots': ['green1', 'yellow1', 'gray1', 'blue2', 'red2'],
            'attempted_shots': ['green1', 'yellow1', 'gray1', 'blue2', 'red2']
        },
    ];


    it('should throw an error if a game is not an array', () => {
        expect(() => scoreHotshotGame('green1')).toThrow();
    });

    it('should throw an error for a game without 10 rounds', () => {
        expect(() => scoreHotshotGame(invalidGame)).toThrow();
    });

    it('should calculate the scorecard correctly 1', () => {
        expect(scoreHotshotGame(validGame1)).toEqual([9, 21, 56, 68, 75, 75, 90, 100, 114, 129]);
    });

    it('should calculate the scorecard correctly 2', () => {
        expect(scoreHotshotGame(validGame2)).toEqual([89, 101, 136, 148, 155, 155, 170, 180, 194, 209]);
    });
});


/*
Further test cases:
- Validate input data
    - Check if all made shots are within attempted shots
    - Check if made bonus shots are within allowed bonus shots (first calculate allowed bonus shots by checking for both upgrades)
    - Check that each shot is valid (ie: green3 is invalid, black1 is invalid)
    - Check that only made_shots, attempted_shots, and made_bonus_shots are present
*/