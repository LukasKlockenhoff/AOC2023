import * as fs from 'fs';

function readInput(filename: string): string[] {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split('\n');
}

function getCalibrationCode(input: string): number {;
    const firstNumber = findFirstNumber(input);
    const lastNumber = findLastNumber(input);
    const inputBeforeFirstNumber = input.slice(0, input.indexOf(firstNumber.toString()));
    const firstSpelledOutNumber = getFirstSpelledOutNumber(inputBeforeFirstNumber);
    const inputAfterLastNumber = input.slice(input.indexOf(lastNumber.toString()) + 1);
    const lastSpelledOutNumber = getLastSpelledOutNumber(inputAfterLastNumber);
    if (firstSpelledOutNumber === -1 && lastSpelledOutNumber === -1) {
        return parseInt(firstNumber.toString() + lastNumber.toString());
    } else if (firstSpelledOutNumber === -1) {
        return parseInt(firstNumber.toString() + lastSpelledOutNumber.toString());
    } else if (lastSpelledOutNumber === -1) {
        return parseInt(firstSpelledOutNumber.toString() + lastNumber.toString());
    }
    return parseInt(firstSpelledOutNumber.toString() + lastSpelledOutNumber.toString());
}

function findFirstNumber(input: string): number {
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

function findLastNumber(input: string): number {
    let num = 0;
    for (let i = input.length - 1; i >= 0; i--) {
        const currentNumber = parseInt(input[i]);
        if (currentNumber) {
            num += currentNumber;
            break;
        }
    }
    return num;
}

function getFirstSpelledOutNumber(input: string): number {
    // returns the index of the spelled out number if it exists, otherwise returns -1
    let spelledOutNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const spelledOutNumbersInString:string[] = [];
    for (let i = 0; i < spelledOutNumbers.length; i++) {
        if (input.includes(spelledOutNumbers[i])) {
            spelledOutNumbers[i] = input.indexOf(spelledOutNumbers[i]).toString();
        }
    }
    let smallestNumber = Infinity;
    for (let i = 0; i < spelledOutNumbers.length; i++) {
        if (parseInt(spelledOutNumbers[i]) < smallestNumber) {
            smallestNumber = parseInt(spelledOutNumbers[i]);
        }
    }
    if (smallestNumber !== Infinity) {
        return spelledOutNumbers.indexOf(smallestNumber.toString()) + 1;
    }
    return -1;
}

function getLastSpelledOutNumber(input: string): number {
    // returns the index of the spelled out number if it exists, otherwise returns -1
    let spelledOutNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const spelledOutNumbersInString:string[] = [];
    for (let i = 0; i < spelledOutNumbers.length; i++) {
        if (input.includes(spelledOutNumbers[i])) {
            spelledOutNumbers[i] = input.indexOf(spelledOutNumbers[i]).toString();
        }
    }
    let largestNumber = -Infinity;
    for (let i = 0; i < spelledOutNumbers.length; i++) {
        if (parseInt(spelledOutNumbers[i]) > largestNumber) {
            largestNumber = parseInt(spelledOutNumbers[i]);
        }
    }
    if (largestNumber !== -Infinity) {
        return spelledOutNumbers.indexOf(largestNumber.toString()) + 1;
    }
    return -1;
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