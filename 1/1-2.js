const { getInput } = require("../helper")

const test = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen"
]

async function init(){

    const spelledDigitsMap = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }

    const input = await getInput("input.txt");
    const strings = input.split("\n")

    const totalSum = strings.reduce((prev, _cur) => {
        let cur = _cur;

        for(const dig in spelledDigitsMap) {
            cur = cur.replace(new RegExp(dig, 'gm'), dig[0] + spelledDigitsMap[dig] + dig[dig.length-1])
        }

        const digits = cur.replace(/[^\d]/gm, "")
        const firstDigit = digits[0]
        const lastDigit = digits[digits.length - 1]
        
        const rowVal = firstDigit + lastDigit

        return prev + parseInt(rowVal)
    }, 0)

    console.log({totalSum})
}

init();