/**
 * Lets try it again
 */
const { getInput } = require("../helper");

const sum = (old, cur) => old + cur

const cardValues = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"].reverse()

const getCardValue = card => cardValues.indexOf(card)
const getTimesInHand = (card, hand) => hand.match(new RegExp(card, 'gm'))?.length ?? 0

const sortRows = (a, b) => {
    if(a.cards.typeScore !== b.cards.typeScore)
        return a.cards.typeScore - b.cards.typeScore

    for(const ind in a.cards.hand) {
        const aval = getCardValue(a.cards.hand[ind])
        const bval = getCardValue(b.cards.hand[ind])

        if(aval === bval) {
            continue;
        }

        return aval - bval;
    }
}

const getHandTypeScore = (hand) => {
    const initialScore = hand.split("").map(card => getTimesInHand(card, hand)).reduce(sum)

    let highestComboScore = initialScore;

    if(hand.indexOf("J") !== -1){
        for(const card of cardValues.filter(card => card !== 'J')) {
            let cur = hand.replace(/J/gm, card)
            let curscore = cur.split("").map(card => getTimesInHand(card, cur)).reduce(sum)

            if(curscore > highestComboScore){
                highestComboScore = curscore;
            }
        }
    }
    
    return highestComboScore;
}

const parseHand = (hand) => ({ hand, typeScore: getHandTypeScore(hand) })

const parseRow = (row) => {
    const [rawhand, bid] = row.split(" ")

    return { 
        bid: parseInt(bid), 
        cards: parseHand(rawhand) 
    }
}

const init = async (test) => {
    const input = await getInput("input.txt")
    const rows = input.split("\n")

    const parsedRows = []
    for(const row of rows) 
    {
        parsedRows.push(parseRow(row))
    }

    const sorted = parsedRows.sort(sortRows).map(
        row => ({
            bid: row.bid,
            hand: row.cards.hand,
            typeScore: row.cards.typeScore
        })
    )

    const totals = sorted.reduce((old, cur, index) => {
        return old + ((index+1) * cur.bid)
    },0)

    console.log({totals})
}

// 254412181: not tested, also in prev set
// 253986478: tested ±21:20

init(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`);