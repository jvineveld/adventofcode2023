/**
 * this one has become a bit messy
 * dont care, it works, this is no production code, and got work to do
 */
const { getInput } = require("../helper");

const cardMap = {
    'A': 13, 
    'K': 12, 
    'Q': 11, 
    'T': 10,
    'J': 0
}

// 254469971
// 254032471
// 254412181
// 254862384
// 254229045
// 253647249
// 254217638
// 253130875
// 252575639
// That's not the right answer; your answer is too low.

const sum = (old, cur) => old + cur

const getCardValue = (card) => parseInt(cardMap[card] ?? card)

const parseHand = (hand) => {
    const cards = {}
    const noJokers = hand.split("").filter(card => card !== 'J')
    const numJokers = Array.from(hand.matchAll(/J/gm)).length

    for(const card of hand) {
        if(card==='J') continue;

        cards[card] = cards[card] ? cards[card] + 1 : 1
    }

    const isFiveOK = new Set(hand).size === 1 || new Set(noJokers).size === 1

    let isFourOK = Object.values(cards).filter(amount => amount === 4).length > 0
    if(!isFourOK && numJokers) {
        if(numJokers >= 3) {
            isFourOK = true;
        } else if(numJokers >= 2) {
            isFourOK = !!Object.values(cards).filter(count => count >= 2).length
        } else if(numJokers >= 1) {
            isFourOK = !!Object.values(cards).filter(count => count >= 3).length
        }
        
        if(hand === 'JJJJ4') {
            console.log({numJokers, isFourOK, cards})
        }
    }

    let isFullHouse = new Set(Object.values(cards).filter(amount => [2, 3].includes(amount))).size === 2

    if(!isFullHouse && numJokers) {
        // only possible if not 3 different cards
        const diffCards = new Set(noJokers).size === 2
        const otherCards = Object.values(cards).reduce(sum, 0)
        
        isFullHouse = diffCards && (otherCards + numJokers === 5)
    }

    let isThreeOfKind = Object.values(cards).filter(amount => [3].includes(amount)).length > 0
    if(!isThreeOfKind && numJokers) {
        isThreeOfKind = Object.values(cards).filter(cardCount => cardCount + numJokers >= 3).length
    }

    let isTwoPair = Object.values(cards).filter(amount => [2].includes(amount)).length > 1
    let isPair = Object.values(cards).filter(amount => amount === 2).length === 1

    if(numJokers) {
        let jokersLeft = numJokers;
        let pairs = 0;
        for(const card in cards) {
            const amount = cards[card];

            if(amount < 2 && jokersLeft) {
                jokersLeft--;
                pairs++;
            }
        }

        if(pairs===1)
            isPair = true;

        if(pairs===2)
            isTwoPair = true;
    }
    
    const isHighCard = new Set(Object.keys(cards)).size === 5

    let comboScore = 0;

    if(isHighCard) comboScore = 1;
    if(isPair) comboScore = 2;
    if(isTwoPair) comboScore = 3;
    if(isThreeOfKind) comboScore = 4;
    if(isFullHouse) comboScore = 5;
    if(isFourOK) comboScore = 6;
    if(isFiveOK) comboScore = 7;

    return {
        cards: hand.split(""),
        cardsScore: hand.split("").map(card => getCardValue(card)).reduce(sum, 0),
        comboScore,
        cardsCount: cards,
        combos: {
            isFiveOK,
            isFourOK,
            isFullHouse,
            isThreeOfKind,
            isTwoPair,
            isPair,
            isHighCard
        }
    }
}

const init = async (test) => {
    const input = await getInput("input.txt")
    const hands = test.split("\n")

    const phands = []

    for(const handbid of hands) {
        const [hand, bid] = handbid.split(" ");
        const score = parseHand(hand)

        phands.push({hand, bid, ...score})
    }

    const sortedHands = phands.sort((a, b) => {
        // check for combos
        if(b.comboScore !== a.comboScore)
            return a.comboScore - b.comboScore

        // if those are equal, compare card to card till theres a diff
        for(const [ind, card] of a.cards.entries()) {
            const aval = getCardValue(card)
            const bval = getCardValue(b.cards[ind])

            if(aval === bval) {
                continue;
            }

            return aval - bval;
        }
    })

    const totalScore = sortedHands.reduce((old, cur, ind) => {
        const bid = parseInt(cur.bid)

        const comboType = Object.keys(cur.combos).filter(comKey => cur.combos[comKey]).shift()

        let readableCardCount = []

        for(const card in cur.cardsCount) {
            readableCardCount.push(`${cur.cardsCount[card]}x${card}`)
        }

        if(readableCardCount.length===0){
            readableCardCount.push("5xJ")
        }

        // if(cur.hand.includes("J"))

        const newval = old + (bid * (ind + 1));
        
        console.log(ind, cur.hand, comboType, bid, cur.hand.split("").filter(char => char === 'J').length, readableCardCount.join(","), newval)

        return newval
    },0)

    console.log({totalScore})
}

init(`AAAAA 2
22222 3
AAAAK 5
22223 7
AAAKK 11
22233 13
AAAKQ 17
TTTJJ 12
333J2 31
22234 19
AAKKQ 23
22334 29
AAKQJ 31
22345 37
AKQJT 41
JJJJJ 12
23456 43`);