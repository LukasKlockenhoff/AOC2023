#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

char** read_file(char* filename, int* length) {
    FILE* file = fopen(filename, "r");
    char** lines = NULL;
    char* line = NULL;
    size_t len = 0;
    ssize_t read;
    int i = 0;

    if (file == NULL) {
        printf("Error while opening file %s\n", filename);
        exit(EXIT_FAILURE);
    }

    while ((read = getline(&line, &len, file)) != -1) {
        lines = realloc(lines, (i + 1) * sizeof(char*));
        lines[i] = malloc((strlen(line) + 1) * sizeof(char));
        strcpy(lines[i], line);
        i++;
    }

    fclose(file);
    if (line) {
        free(line);
    }

    *length = i;
    return lines;
}

char** findFirstDigitInString(char* inputString) {
    for (int i = 0; i < strlen(inputString); i++) {
        if (inputString[i] >= '0' && inputString[i] <= '9') {
            char** result = malloc(2 * sizeof(char*));
            result[0] = malloc(sizeof(char));
            result[1] = malloc(sizeof(char));
            result[0][0] = inputString[i];
            result[1][0] = '\0';
            return result;
        }
    }
    return NULL;
}

char* reverseString(char* inputString) {
    char* result = malloc((strlen(inputString) + 1) * sizeof(char));
    int j = 0;
    for (int i = strlen(inputString) - 1; i >= 0; i--) {
        result[j] = inputString[i];
        j++;
    }
    result[j] = '\0';
    return result;
}

int getCalibrationCode(char* inputString) {
    char* reversed = reverseString(inputString);
    char** lastDigit = findFirstDigitInString(reversed);
    char** firstDigit = findFirstDigitInString(inputString);
    char* concatinatedNumber = malloc(2 * sizeof(char));
    concatinatedNumber[0] = firstDigit[0][0];
    concatinatedNumber[1] = lastDigit[0][0];
    int result = atoi(concatinatedNumber);
    free(reversed);
    free(lastDigit[0]);
    free(lastDigit[1]);
    free(lastDigit);
    free(firstDigit[0]);
    free(firstDigit[1]);
    free(firstDigit);
    free(concatinatedNumber);
    return result;
}

int main(int argc, char** argv) {
    int length = 0;
    char** lines = read_file("../input.txt", &length);
    int result = 0;
    for (int i = 0; i < length; i++) {
        result += getCalibrationCode(lines[i]);
    }
    printf("Result: %d\n", result);
    for (int i = 0; i < length; i++) {
        free(lines[i]);
    }
    free(lines);
    exit(EXIT_SUCCESS);
}