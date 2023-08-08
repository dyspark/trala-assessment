const scoreMap = {
    green: 5,
    yellow: 4,
    gray: 3,
    blue: 2,
    red: 1
};

const getColorScore = (shot) => {
    const color = shot.slice(0, -1);

    if (!scoreMap.hasOwnProperty(color)) {
        throw new Error(`Invalid color: ${color}`);
    }

    return color;
};

const calculateRoundScore = (round, roundNum) => {
    const {
        made_shots: madeShots = [],
        attempted_shots: attemptedShots = [],
        made_heatcheck_shots: madeHeatcheckShots = [],
        made_GOAT_shots: madeGOATShots = []
    } = round;

    const attemptedShotsMap = new Map();
    const isFinalRound = roundNum === 10;
    let redShotCounter = 0;
    let score = 0;

    for (const shot of attemptedShots) {
        attemptedShotsMap.set(shot, (attemptedShotsMap.get(shot) || 0) + 1);
    }

    for (const shot of madeShots) {
        attemptedShotsMap.set(shot, attemptedShotsMap.get(shot) - 1);

        const color = getColorScore(shot);

        if (color === 'red') {
            redShotCounter++;
        }

        score += scoreMap[color];
    }

    for (const shot of madeHeatcheckShots) {
        const color = getColorScore(shot);
        const multiplier = isFinalRound ? 2 : 3;

        score += scoreMap[color] * multiplier;
    }

    for (const shot of madeGOATShots) {
        const color = getColorScore(shot);

        score += scoreMap[color];
    }

    const missedRedShots = attemptedShotsMap.get('red1') || 0 + attemptedShotsMap.get('red2') || 0;
    
    if (redShotCounter > 2) {
        score = 0;
    }

    return Math.max(0, score - missedRedShots * 2);
};

const scoreHotshotGame = (game) => {
    try {
        if (!Array.isArray(game)) {
            throw new Error('Input game must be an array');
        }
        if (game.length !== 10) {
            throw new Error('Input game must have 10 rounds');
        }

        let totalScore = 0;

        const scorecard = game.map((round, index) => {
            const roundScore = calculateRoundScore(round, index + 1);

            totalScore += roundScore;

            return totalScore;
        });

        return scorecard;
    } catch (err) {
        console.error(err);
        //handle error
        throw new Error(err);
    }
};

module.exports = {
    getColorScore,
    calculateRoundScore,
    scoreHotshotGame
};