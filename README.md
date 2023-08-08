## Description
This pull request adds a function that calculates the scoreboard for a game of Hotshot.

## Assumptions
- There are 10 rounds
- Each round consists of 1 minute of made shots plus any made bonus shots
- There are 8 spots: 1 green (5 points), 1 yellow (4 points), 2 gray (3 points), 2 blue (2 points), 2 red (1 point)
- Maximum of 2 non-bonus shots made from red spots per round. Anything above will result in a forfeited round with 0 points.
- Heatcheck upgrade is acquired when at least 45 non-bonus points are scored in a round
- GOAT upgrade is acquired when at least one shot from each of the 8 spots is made in a single round
- For the first 9 rounds, a heatcheck upgrade allows 3 bonus attempts, worth triple points, and a GOAT upgrade allows 4 bonus attempts, worth normal points
In the last (10th) round, a heatcheck upgrade allows 2 bonus attempts for each round with non-bonus score of 30+, where each bonus shot made is worth double points. A GOAT upgrade allows one bonus shot from each of the 8 spots, worth normal points.
- 2 points are deducted for all non-bonus missed shots
- Upgrades are not mutually exclusive 

## Requirements
- Write a function to return a scorecard for a game of hotshot
- Verify with automated tests that the function correctly generates the scorecard.

## Modifications
- The input data for each round was modified like so:
```
{
    made_shots: [],
    attempted_shots: [],
    made_GOAT_shots: [],
    made_heatcheck_shots: []
}
```
 In cases where both upgrades were acquired it would be impossible to differentiate which shot is from which upgrade if we had a combined array such as made_bonus_shots. The reason we need to differentiate is because heatcheck bonus shots have a multipler.


## Testing
- Unit tests have been added to verify that the scoreboard is being calculated correctly, per round and per game.
- It wasn't clear how extensive the tests needed to be.
- Here are some potential test cases I though were out of scope for this assignment:
 - Validate input data
    - Check if all made shots are within attempted shots
    - Check if made bonus shots are within allowed bonus shots (first calculate allowed bonus shots by checking for both upgrades, check rounds with non-bonus score of 30+, etc)
    - Check that each shot is valid (ie: green3 is invalid, black1 is invalid)
    - Check that only made_shots, attempted_shots, made_GOAT_shots, and made_heatcheck_shots are present

## Run tests:
```
npm install
npm test
```