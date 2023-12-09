/**
 * Lets try it again
 */
const { getInput } = require("../helper");

const sum = (old, cur) => old + cur

const cardValues = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"].reverse()
const comboScores = [ "onePair", "twoPair", "threeOK", "fullHouse", "fourOK", "fiveOK"]

const getCardValue = card => cardValues.indexOf(card)
const getComboValue = combo => comboScores.indexOf(combo)
const getTimesInHand = (card, hand) => hand.match(new RegExp(card, 'gm'))?.length ?? 0

const sortRows = (a, b) => {
    const comboA = getComboValue(a.cards.typeScore);
    const comboB = getComboValue(b.cards.typeScore);

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
    if(!hand){
        console.log("undefined>?")
        return;
    }

    // check for jokers
    const initialScore = hand.split("").map(card => getTimesInHand(card, hand)).reduce(sum)

    console.log({hand, initialScore})
    let highestComboScore = initialScore;
    let hightesComboSol = hand

    if(hand.indexOf("J") !== -1){
        for(const card of cardValues.filter(card => card !== 'J')) {
            let cur = hand.replace(/J/gm, card)
            let curscore = cur.split("").map(card => getTimesInHand(card, cur)).reduce(sum)
    
            console.log(curscore, cur, hand)
            if(curscore > highestComboScore){
                highestComboScore = curscore;
                hightesComboSol = cur
            }
        }
        console.log({hand})
    }

    console.log({hand, highestComboScore, hightesComboSol})
    
    return highestComboScore;

    // the number of times the card that has most occurences in hand
    const mccount = [...uniqueCards].reduce((old, card) => {
        const times = getTimesInHand(card, hand)
        if(times > old) 
            return times
        return old;
    },0)

    const numJokers = getTimesInHand('J', hand)
    const uc = !!numJokers ? uniqueCards.size - 1 : uniqueCards.size;

    if(numJokers === 5){
        return 'fiveOK'
    }

    switch(uc){
        case 4: return 'onePair'
        case 3:
            if(mccount+numJokers>=3) {
                return 'threeOK'
            } else {
                return 'twoPair'
            }
        case 2:
            if(mccount+numJokers>=4) {
                return 'fourOK'
            } else {
                return 'fullHouse'
            }
        case 1: return 'fiveOK'
    }

    return 'highcard'
}

const parseHand = (hand) => ({ hand, typeScore: getHandTypeScore(hand) })

const parseRow = (row) => {
    const [rawhand, bid] = row.split(" ")

    console.log({row, rawhand, bid})

    return { 
        bid: parseInt(bid), 
        cards: parseHand(rawhand) 
    }
}

const init = async (test) => {
    const input = await getInput("input.txt")
    const rows = input.split("\n")

    const parsedRows = []
    console.log({rows})
    for(const row of rows) 
    {
        console.log(rows, row)
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

    sorted.forEach(row => console.log(row.hand))

    console.log({totals})
}

// 254412181: not tested, also in prev set
// 253986478: tested ±21:20

init(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`);