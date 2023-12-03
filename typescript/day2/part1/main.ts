import * as fs from 'fs';

type Color = {
    name: string,
    count: number
}

type HighestCount = {
    red: number,
    blue: number,
    green: number
}

const GameConstraints:HighestCount = {
    red: 12,
    blue: 14,
    green: 13
}

function getGameId(input: string): number {
    return parseInt(input.split(' ')[1]);
}

function getHighestCountPerColor(input: string): HighestCount {
    let highestCount = 0;
    let reveals = input.split(';');
    let gameColors: Color[] = [];
    reveals.forEach(reveal => {
        let colors = reveal.split(',').map(color => color.trim());
        colors.forEach(color => {
            gameColors.push({
                name: color.split(' ')[1],
                count: parseInt(color.split(' ')[0])
            });
        });
    });
    let maxRedCount = gameColors.filter(color => color.name === 'red').sort((a, b) => b.count - a.count)[0].count;
    let maxBlueCount = gameColors.filter(color => color.name === 'blue').sort((a, b) => b.count - a.count)[0].count;
    let maxGreenCount = gameColors.filter(color => color.name === 'green').sort((a, b) => b.count - a.count)[0].count;
    return {
        red: maxRedCount,
        blue: maxBlueCount,
        green: maxGreenCount
    };
}

function isGameValid(input: string): boolean {
    let highestCountPerColor = getHighestCountPerColor(input);
    if (highestCountPerColor.red > GameConstraints.red || highestCountPerColor.blue > GameConstraints.blue || highestCountPerColor.green > GameConstraints.green) {
        return false;
    }
    return true;
}

function main() {
    let input = fs.readFileSync('../input.txt', 'utf8');
    let games = input.split('\n');
    let idSum = 0;
    games.forEach(game => {
        const gameName = game.split(':')[0];
        const gameReveals = game.split(':')[1];
        if (isGameValid(gameReveals)) {
            idSum += getGameId(gameName);
        }
    });
    console.log(idSum);
}

main();