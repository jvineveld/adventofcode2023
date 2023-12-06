const { getInput } = require("../helper");

const extractNumbers = (str) => str.split(" ").filter(time => time.trim()).map(time => parseInt(time))

const init = async (test) => {
    const input = await getInput("input.txt");
    const content = input.split("\n");

    const times = extractNumbers(content[0].replace("Time:", ""))
    const recordDistance = extractNumbers(content[1].replace("Distance:", ""))

    const sums = []

    for(const [index, maxTime] of times.entries()){
        const curRecord = recordDistance[index]
        let winningOptions = 0;

        for(let pTime=0; pTime<maxTime; pTime++) {
            let moveTimes = maxTime - pTime
            let moveAmount = moveTimes * pTime

            if(moveAmount > curRecord){
                winningOptions++;
            }
        }

        console.log(`Game ${index+1}, has ${winningOptions} winning options`)
        sums.push(winningOptions)
    }

    console.log({ answer: sums.reduce((old, cur) => cur * old, 1) })
}

init(`Time:      7  15   30
Distance:  9  40  200`);