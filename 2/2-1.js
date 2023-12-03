const { getInput } = require("../helper")

const test = [
    "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
]

const maxCubes = {
    red: 12,
    green: 13,
    blue: 14
}

const validGames = []

const init = async () => {
    const input = await getInput("input.txt");
    const games = input.split("\n").map(gameStr => gameStr.replace(/Game [\d]{1,}\: /, ""))

    for(const [index, game] of games.entries()) {
        const sets = game.split(';');
        const counts = {
            red: 0,
            green: 0,
            blue: 0
        }

        let isValid = true;

        for(const set of sets) {
            const cubeMatches = set.matchAll(/([\d+]{1,}) (\w+)/gm)

            for(const cubeMatch of cubeMatches) {
                const count = parseInt(cubeMatch[1]),
                    color = cubeMatch[2]

                if(count > maxCubes[color])
                    isValid = false;

                counts[color] += count;
            }
        }

        const gameId = index + 1

        if(isValid){
            validGames.push(parseInt(gameId))
        }
    }

    const totalScore = validGames.reduce((prev, cur) => prev+cur, 0)

    console.log({totalScore, validGames})
}

init();