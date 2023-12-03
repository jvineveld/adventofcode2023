const { getInput } = require("../helper")

const test = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet"
]

async function init(){

    const input = await getInput("input.txt");
    const strings = input.split("\n")

    const output = strings.reduce((prev, cur) => {
        const digits = cur.replace(/[^\d]/gm, "")
        const firstDigit = digits[0]
        const lastDigit = digits[digits.length - 1]

        const rowVal = firstDigit + lastDigit

        return prev + parseInt(rowVal)
    }, 0)

    console.log({output})
}

init();