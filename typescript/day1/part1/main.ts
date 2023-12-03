import * as fs from 'fs';

function readInput(filename: string): string[] {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split('\n');
}

function getCalibrationCode(input: string): number {
    const reverseInputArr = input.split('').reverse();
    console.log(reverseInputArr);
    const inputArr = input.split('');
    console.log(inputArr);
    return parseInt(findFirstNumber(inputArr).toString() + findFirstNumber(reverseInputArr));
}

function findFirstNumber(input: string[]): number {
    let num = 0;
    for (let i = 0; i < input.length; i++) {
        const currentNumber = parseInt(input[i]);
        if (currentNumber) {
            num += currentNumber;
            break;
        }
    }
    return num;
}

function main() {
    const input = readInput('../input.txt');
    let calibrationCode = 0;
    for (let i = 0; i < input.length; i++) {
        const result = getCalibrationCode(input[i]);
        calibrationCode += result;
    }
    console.log(calibrationCode);
}

main();