const { getInput } = require("../helper")

const test = `
Card 1: 41 48 83 86 17 | 83 86  6 41 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 20 16 32 13 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 12  3  4  4  4 | 69 82 63 72 16 21 14  1
Card 5: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 6: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 7: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`

const init = async () => {
    const input = await getInput("input.txt");
    const cards = input.split("\n").map(gameStr => gameStr.replace(/Card\s+[\d]{1,}\:/, "")).filter(row => !!row)

    let copies = {}

    for(const [index, cardNums] of cards.entries()) {
        const cardId = index + 1;

        const numbers = cardNums.split('|')
        const winning = Array.from(numbers[0].matchAll(/ .{2}/gm)).map(num => parseInt(num[0]))
        const curnums = Array.from(numbers[1].matchAll(/ .{2}/gm)).map(num => parseInt(num[0]))

        const winningNums = curnums.filter(num => winning.includes(num))
        
        copies[cardId] = !copies[cardId] ? 1 : copies[cardId] + 1;

        const nextCardId = cardId + 1;
        for(let c=1; c<=copies[cardId]; c++){
            for(let i = nextCardId; i<nextCardId+winningNums.length; i++) {
                copies[i] = copies[i] ? copies[i] + 1 : 1;
            }
        }
    }

    console.log({copies})

    console.log(`sum of copies`, Object.values(copies).reduce((old, cur) => old + cur, 0))
}

init();