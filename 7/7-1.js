const { getInput } = require("../helper");

const cardMap = {
    'A': 14, 
    'K': 13, 
    'Q': 12, 
    'J': 11, 
    'T': 10
}

const sum = (old, cur) => old + cur

const getCardValue = (card) => parseInt(cardMap[card] ?? card)

const parseHand = (hand) => {
    const cards = {}

    for(const card of hand) {
        cards[card] = cards[card] ? cards[card] + 1 : 1
    }

    const isFiveOK = Object.values(cards).shift() === 5
    const isFourOK = Object.values(cards).filter(amount => amount === 4).length > 0
    const isFullHouse = new Set(Object.values(cards).filter(amount => [2, 3].includes(amount))).size === 2
    const isThreeOfKind = Object.values(cards).filter(amount => [3].includes(amount)).length > 0
    const isTwoPair = Object.values(cards).filter(amount => [2].includes(amount)).length > 1
    const isPair = Object.values(cards).filter(amount => amount === 2).length === 1
    const isHighCard = new Set(Object.keys(cards)).size === 5

    console.log(isHighCard, {cards}, new Set(Object.values(cards)))

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
    const hands = input.split("\n")

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

        console.log(cur.hand, cur.bid, (bid * (ind + 1)), comboType)

        return old + (bid * (ind + 1))
    },0)

    console.log({totalScore})
}

init(`32T3K 765
2AAAA 123
33332 123
77888 684
77788 28
QTTQK 749
JQAA2 148
37J44 319
559J5 647
92992 659
55AA5 58
KKTT8 629
3J38J 562
87QQQ 434
55A55 520
T777T 813
76T8T 841
8989A 649
88Q44 857
Q4444 362
Q5555 362
T4Q23 369
AAQQA 812
34JTQ 635
QQA44 553
78787 286
K963A 63
27T98 25
6767A 929
TT8TK 343
5566J 496
A7339 618
28J8A 641
Q688J 118
6JJ46 131
66436 473
TK3QK 482
AAAAA 482
KKKKK 482
JJJJJ 482
QQQQQ 482
TTTTT 482
5454T 724
TTQQT 74
ATATA 41
34123 28
KTJJT 220
QQQJA 483`);