const { getInput } = require("../helper");

const extractNumbers = (str) => parseInt(str.split(" ").filter(time => time.trim()).join(""))

const init = async (test) => {
    const input = await getInput("input.txt")
    const content = input.split("\n")

    const maxTime = extractNumbers(content[0].replace("Time:", ""))
    const recordDistance = extractNumbers(content[1].replace("Distance:", ""))

    let winningOptions = 0;

    for(let pTime=0; pTime<maxTime; pTime++) {
        let moveTimes = maxTime - pTime
        let moveAmount = moveTimes * pTime

        if(moveAmount > recordDistance){
            winningOptions++;
        }
    }

    console.log(`Game has ${winningOptions} winning options`)
}

init(`Time:      7  15   30
Distance:  9  40  200`);