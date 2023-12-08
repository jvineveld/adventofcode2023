const { getInput } = require("../helper");

const cycleArr = (arr, index) => index + 1 > (arr.length - 1) ? 0 : index + 1;

// a recursive function took me into the maximum-call-stack-size-exceeded error
// so we now have a while loop with a max limit, JS is OK with that.

const init = async (test) => {
    const input = await getInput("input.txt")
    const directions = input.split("\n")

    const navDirections = directions[0];

    const maps = {}

    let mapEntry = "AAA"

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

    let steps = 0
    let nextPointer = "AAA"
    let finished = false
    let dirIndex = 0

    while(steps < 40000 && !finished) {
        steps++;

        const nextDir = dirs[dirIndex]

        nextPointer = maps[nextPointer][nextDir]
    
        if(nextPointer === 'ZZZ' || !nextPointer) {
            finished = true;
        }

        dirIndex = cycleArr(dirs, dirIndex);
    }
    
    console.log(`Finished in ${steps} steps`)
}

init(`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`);