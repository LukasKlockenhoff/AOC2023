
def readInputFile() -> list:
    with open("../input.txt") as f:
        return f.readlines()
    
def get_calibration_code(input_string: str) -> int:
    reversed_input_string = input_string[::-1]
    return int(find_first_digit_in_string(input_string) + find_first_digit_in_string(reversed_input_string))

def find_first_digit_in_string(input_string: str) -> str:
    for i in range(len(input_string)):
        if input_string[i].isdigit():
            return input_string[i]

def main():
    input_list = readInputFile()
    calibration_code = 0
    for input_string in input_list:
        calibration_code += get_calibration_code(input_string)
    print(calibration_code)


if __name__ == "__main__":
    main()