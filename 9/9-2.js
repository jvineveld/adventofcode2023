
const { getInput } = require("../helper");

const printRow = (longestNumLength, numbers, row) => {
    const extraSpacing = longestNumLength + 3;

    const initialRowSpacing = Array.from(new Array((longestNumLength * row))).join(" ")

    let str = initialRowSpacing
    
    for(const num of numbers) {
        const curNumLength = Math.floor((longestNumLength/2)) - Math.floor(String(num).length / 2)
        const spacing = Array.from(new Array((curNumLength) + extraSpacing)).join(" ")

        str += spacing + num;
    }

    console.log(str)
}

const loopSequence = (numbers) => {
    const diffs = []

    const revnums = numbers

    for(let index=1; index<revnums.length; index++) {
        const thisDiff = revnums[index] - revnums[index-1];

        diffs.push(thisDiff)
    }

    return diffs;
}

const findNextValues = (rows) => {

    const urows = rows.reverse()

    urows[0].unshift(urows[0][urows[0].length - 1])

    let newNum = 0;

    for(const [rowNum, row] of urows.entries()){
        if(rowNum === 0){
            continue;
        }

        let prevRow = urows[rowNum - 1];

        const newval = row[0] - prevRow[0]
        newNum = newval

        row.unshift(newval)
    }

    return {
        tree: urows.reverse(),
        newNum
    }
}

const renderHistory = (history) => {
    const numbers = history.split(" ").map(num => parseInt(num))

    let allZeros = false;
    let curResults = numbers
    let timesrun = 1;
    const rows = [curResults]

    while(!allZeros) {
        timesrun++;
        
        curResults = loopSequence(curResults);

        rows.push(curResults)

        // printRow(longestNumLength, curResults, timesrun)

        if(curResults[0] === 0 && new Set(curResults).size === 1){
            allZeros = true;
        }
    }

    // console.log({diffs})

    return rows;
}

const init = async (test) => {
    const input = await getInput("input.txt")
    const histories = input.split("\n")

    const nums = []
    for(const [ind, history] of histories.entries()){
        console.log(`\nRendering row ${ind + 1}:`)
        const rows = renderHistory(history)
        const longestNumLength = String(history[0]).length + 2

        for(const [i, row] of rows.entries()) printRow(longestNumLength, row, i)

        console.log(`\nNow row ${ind + 1} with new values:`)
        const rowsWithNewVals = findNextValues(rows)
        for(const [i, row] of rowsWithNewVals.tree.entries()) printRow(longestNumLength, row, i)

        nums.push(rowsWithNewVals.newNum)

    }
    console.log(nums.reduce((old, cur) => old + cur, 0), nums)

}
//
init(`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`);