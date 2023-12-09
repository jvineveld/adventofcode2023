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
    const comboA = getComboValue(a.cards.type);
    const comboB = getComboValue(b.cards.type);

    if(comboA !== comboB)
        return comboA - comboB

    for(const ind in a.cards.hand) {
        const aval = getCardValue(a.cards.hand[ind])
        const bval = getCardValue(b.cards.hand[ind])

        if(aval === bval) {
            continue;
        }

        return aval - bval;
    }
}

const getHandType = hand => {
    let uniqueCards = new Set(hand)

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

const parseHand = (hand) => ({ hand, type: getHandType(hand) })

const parseRow = (row) => {
    const [rawhand, bid] = row.split(" ")

    return { 
        bid: parseInt(bid), 
        cards: parseHand(rawhand) 
    }
}

const init = async (test) => {
    const input = await getInput("input.txt")
    const rows = test.split("\n")

    const parsedRows = []

    for(const row of rows) 
        parsedRows.push(parseRow(row))

    const sorted = parsedRows.sort(sortRows).map(
        row => ({
            bid: row.bid,
            hand: row.cards.hand,
            combo: row.cards.type
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

init(`2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`);