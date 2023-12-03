const { getInput } = require("../helper")

const test = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

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

const init = async () => {
    const input = await getInput("input.txt");
    const rows = input.split("\n")

    const engineNumbers = []

    for(const [y, chars] of rows.entries()) {

        const numberGroups = chars.matchAll(/[\d]{1,}/gm)

        for(const group of numberGroups) {
            const [ groupStr ] = group;

            const startIndex = group.index;
            const endIndex = startIndex + groupStr.length;

            let groupTouchesSymbol = false;

            for(let x=startIndex; x<endIndex; x++) {
                if(groupTouchesSymbol){
                    continue;
                }

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

                touchesChars = Object.values(touching)
                                    .filter((val) => !/\d/.test(val) && val !== '.' ) // remove digits and dots
                                    .filter(val => !!val) // remove undefined

                groupTouchesSymbol = !!touchesChars.length

            }

            if(groupTouchesSymbol){
                engineNumbers.push(parseInt(group[0]))
            }
        }
    }

    const answer = engineNumbers.reduce((old, cur) => old + cur, 0)
    console.log({answer})
}

init();