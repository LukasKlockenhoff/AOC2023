import * as fs from 'fs';

type NumberInString = {
    number: number;
    index: number;

}

function readInput(filename: string): string[] {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split('\n');
}

function getCalibrationCode(input: string): number {;
    const firstNumber = findFirstNumber(input);
    const lastNumber = findLastNumber(input);
    const inputBeforeFirstNumber = input.slice(0, firstNumber.index);
    const firstSpelledOutNumber = getFirstSpelledOutNumber(inputBeforeFirstNumber);
    const inputAfterLastNumber = input.slice(lastNumber.index + 1);
    const lastSpelledOutNumber = getLastSpelledOutNumber(inputAfterLastNumber);
    if (firstSpelledOutNumber === -1 && lastSpelledOutNumber === -1) {
        return parseInt(firstNumber.number.toString() + lastNumber.number.toString());
    } else if (firstSpelledOutNumber === -1) {
        return parseInt(firstNumber.number.toString() + lastSpelledOutNumber.toString());
    } else if (lastSpelledOutNumber === -1) {
        return parseInt(firstSpelledOutNumber.toString() + lastNumber.number.toString());
    }
    return parseInt(firstSpelledOutNumber.toString() + lastSpelledOutNumber.toString());
}

function findFirstNumber(input: string): NumberInString {
    let num = 0;
    for (let i = 0; i < input.length; i++) {
        const currentNumber = parseInt(input[i]);
        if (currentNumber) {
            num += currentNumber;
            return {number: num, index: i};
        }
    }
    return {number: num, index: -1};
}

function findLastNumber(input: string): NumberInString {
    let num = 0;
    for (let i = input.length - 1; i >= 0; i--) {
        const currentNumber = parseInt(input[i]);
        if (currentNumber) {
            num += currentNumber;
            return {number: num, index: i};
        }
    }
    return {number: num, index: -1};
}

function getFirstSpelledOutNumber(input: string): number {
    let iteratedString = input.slice(0, 3);
    let spelledOutNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    for (let i = 0; i < input.length; i++) {
        for (let i = 0; i < spelledOutNumbers.length; i++) {
            if (iteratedString.includes(spelledOutNumbers[i])) {
                return i + 1;
            }
        }
        iteratedString = input.slice(0, 3 + i);
    }
    return -1;
}

function getLastSpelledOutNumber(input: string): number {
    let iteratedString = input.slice(input.length - 3);
    let spelledOutNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    for (let i = 0; i < input.length; i++) {
        for (let i = 0; i < spelledOutNumbers.length; i++) {
            if (iteratedString.includes(spelledOutNumbers[i])) {
                return i + 1;
            }
        }
        iteratedString = input.slice(input.length - 3 - i);
    }
    return -1;
}
function main() {
    const input = readInput('../input.txt');
    let calibrationCode = 0;
    let counter = 0;
    for (let i = 0; i < input.length; i++) {
        const result = getCalibrationCode(input[i]);
        calibrationCode += result;
    }
    console.log(calibrationCode);
}

main();