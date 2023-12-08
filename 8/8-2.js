
const { getInput } = require("../helper");
var lcm = require('lcm');


const cycleArr = (arr, index) => index + 1 > (arr.length - 1) ? 0 : index + 1;

console.log(cycleArr([1,2,3], 2))

// a recursive function took me into the maximum-call-stack-size-exceeded error
// so we now have a while loop with a max limit, JS is OK with that.


const walk = (startPoint, dirs, maps) => {
    let steps = 0
    let nextPointer = startPoint
    let finished = false
    let dirIndex = 0

    while(steps < 10000000 && !finished) {
        steps++;

        const nextDir = dirs[dirIndex]

        nextPointer = maps[nextPointer][nextDir]
    
        if(nextPointer.charAt(2) === "Z" || !nextPointer) {
            finished = true;
        }

        dirIndex = cycleArr(dirs, dirIndex);
    }
    
    return steps;
} 

const init = async (test) => {
    const input = await getInput("input.txt")
    const directions = input.split("\n")

    const navDirections = directions[0];

    const maps = {}

    for(const loc of directions.slice(1,)) {
        const matches = loc.match(/(^[^\0]{3,3})[^\0]*\(([^\0]{3,3}), ([^\0]{3,3})\)/)

        if(!matches){
            continue;
        }

        maps[matches[1]] = {
            L: matches[2], 
            R: matches[3]
        }
    }

    const dirs = navDirections.split("");

    const nextPointers = Object.keys(maps).filter(mapKey => mapKey.charAt(2) === "A")

    const counts = []
    for(const pointer of nextPointers) {
        const count = walk(pointer, dirs, maps)
        counts.push(count)
    }


    const sum = counts.reduce((old, cur) => lcm(old, cur), 1)
    console.log(`Finished in ${sum} steps`)
}

init(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`);