const { getInput } = require("../helper")

const test = `467..114..
...*......
..35..633.
......#...
617*123...
..332+*58.
..592*....
......755.
...$.*....
.664*598..`

function getRowAbove(y, set) {
    return y-1 < 0 ? null : set[y - 1]
}

function getRowBelow(y, set) {
    return y+1 > set.length ? null : set[y + 1]
}

function getLeft(x, row) {
    if(!row) return;
    return x-1 < 0 ? null : row[x - 1]
}

function getRight(x, row) {
    if(!row) return;
    return x+1>row.length ? null : row[x + 1]
}

/**
 * {
 *      ["starY/starX"]: [
 *          numberGroup,
 *          numberGroup,
 *          ...
 *      ]
 * }
 */

const starsIndex = {} 

const init = async () => {
    const input = await getInput("input.txt");
    const rows = input.split("\n")

    for(const [y, chars] of rows.entries()) {

        const numberGroups = chars.matchAll(/[\d]{1,}/gm)
        
        for(const group of numberGroups) {
            const [ groupStr ] = group;
            
            const startIndex = group.index;
            const endIndex = startIndex + groupStr.length;
            
            const groupStars = new Set()

            for(let x=startIndex; x<endIndex; x++) {

                const touching = {
                    topLeft: getLeft(x, getRowAbove(y, rows)),
                    top: getRowAbove(y, rows)?.[x],
                    topRight: getRight(x, getRowAbove(y, rows)),
                    left: getLeft(x, chars),
                    right: getRight(x, chars),
                    bottomLeft: getLeft(x, getRowBelow(y, rows)),
                    bottom: getRowBelow(y, rows)?.[x],
                    bottomRight: getRight(x, getRowBelow(y, rows)),
                }

                for(const pos in touching) {
                    const touchPos = pos.toLowerCase()
                    const touchChar = touching[pos]

                    if(touchChar!=='*') continue;

                    let starX = x;
                    let starY = y;

                    if(touchPos.includes('top')) {
                        starY = y - 1;
                    }

                    if(touchPos.includes('bottom')) {
                        starY = y + 1;
                    }

                    if(touchPos.includes('left')) {
                        starX = x - 1;
                    }

                    if(touchPos.includes('right')) {
                        starX = x + 1;
                    }

                    groupStars.add(`${starY}/${starX}`)
                }

            }

            for(const starPos of Array.from(groupStars)) {
                if(!starsIndex[starPos]){
                    starsIndex[starPos] = []
                }
                starsIndex[starPos].push(groupStr)
            }
        }
    }

    let total = 0;
    for(const star in starsIndex) {
        const numGroups = Array.from(starsIndex[star])

        if(numGroups.length !== 2) {
            continue;
        }

        total += numGroups.reduce((old, cur) => old * cur, 1);
    }

    console.log({answer: total})
}

init();