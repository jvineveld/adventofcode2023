const input = [
    "1 red, 5 blue, 10 green; 5 green, 6 blue, 12 red; 4 red, 10 blue, 4 green",
    "2 green, 1 blue; 1 red, 2 green; 3 red, 1 blue; 2 blue, 1 green, 8 red; 1 green, 10 red; 10 red",
    "14 red, 9 green, 5 blue; 2 green, 5 red, 7 blue; 1 blue, 14 green; 6 green, 2 red",
    "2 green, 3 blue, 9 red; 1 red, 1 green; 4 red, 4 blue; 1 blue, 19 red; 7 red",
    "1 green, 10 blue, 4 red; 15 green, 4 red, 5 blue; 14 blue, 14 green, 2 red; 15 green, 7 blue, 1 red; 2 red, 9 green, 17 blue",
    "2 red, 2 blue, 4 green; 3 red, 13 blue, 9 green; 1 red, 14 blue, 3 green; 9 green, 11 blue, 3 red; 6 blue, 2 green",
    "11 green, 6 blue, 6 red; 2 blue, 3 red, 9 green; 3 red, 5 blue, 5 green; 6 red, 5 green, 3 blue; 9 red, 6 blue",
    "11 blue, 3 red; 3 blue, 2 green, 13 red; 11 red, 7 blue, 1 green",
    "2 green, 1 blue, 3 red; 9 green, 4 red; 7 red, 5 green; 4 red, 1 blue; 11 green, 16 red; 2 red, 6 green",
    "1 red, 4 blue, 1 green; 7 green, 3 red, 1 blue; 5 blue, 7 red",
    "1 red, 11 blue, 7 green; 6 green, 2 blue, 12 red; 8 blue, 7 green, 5 red",
    "11 red, 5 blue, 4 green; 8 blue, 15 red, 5 green; 9 blue, 11 green, 1 red; 6 blue, 3 red, 9 green; 5 red, 2 blue, 1 green",
    "5 red, 2 blue, 7 green; 1 red, 8 green; 6 green, 4 red",
    "1 green, 2 blue, 2 red; 5 red, 1 blue, 2 green; 4 red, 1 blue",
    "6 green, 1 red; 4 red, 5 blue, 6 green; 1 green, 3 blue, 4 red; 5 green, 8 red",
    "16 red, 10 blue, 3 green; 9 blue, 13 green, 5 red; 14 green, 2 blue, 2 red; 3 blue, 1 green, 1 red; 2 green, 4 blue, 8 red; 1 blue, 17 red, 9 green",
    "6 red, 1 blue, 15 green; 5 red, 5 green; 16 green, 5 red, 4 blue; 5 red, 8 green, 2 blue; 12 blue, 13 green, 3 red",
    "17 green, 5 blue; 2 green, 14 red; 10 green, 9 red, 10 blue; 6 red, 11 green, 6 blue",
    "12 green, 2 blue, 4 red; 1 blue, 16 red; 8 green, 2 blue, 14 red",
    "1 red, 4 green; 5 red, 4 green; 4 green, 1 red; 5 red, 1 blue, 3 green",
    "15 red, 5 blue, 12 green; 10 green, 12 red, 1 blue; 9 red, 14 blue, 1 green; 2 green, 13 red, 7 blue; 12 blue, 11 red, 12 green",
    "8 blue, 3 red; 2 green, 4 red, 3 blue; 1 blue, 2 red, 1 green; 13 blue, 4 red, 2 green",
    "3 blue, 5 green, 3 red; 4 green, 9 red; 3 red, 2 green; 2 blue, 3 green, 2 red; 2 green, 3 blue, 5 red",
    "15 red, 1 green; 1 blue, 14 red, 1 green; 5 green, 14 red; 4 blue, 1 red, 3 green; 1 blue, 4 green, 3 red",
    "3 green, 3 red; 8 green, 1 red, 2 blue; 1 blue, 11 green",
    "3 red, 12 green, 15 blue; 15 blue, 2 red, 2 green; 2 red, 18 blue; 3 red, 14 blue, 7 green",
    "6 green, 15 red, 10 blue; 6 green, 7 red, 4 blue; 14 blue, 12 red, 7 green; 8 red, 14 blue, 17 green; 15 red, 14 blue, 4 green; 5 red, 1 blue, 5 green",
    "5 blue, 3 green; 3 green, 2 blue, 4 red; 8 green, 6 red; 4 red, 2 green, 5 blue; 1 blue, 5 red, 5 green; 1 red, 4 blue, 9 green",
    "4 blue, 9 red, 12 green; 2 red, 14 blue, 13 green; 2 red, 10 green; 5 green, 14 blue, 9 red",
    "3 red, 3 blue, 13 green; 2 blue, 10 green, 4 red; 2 blue, 5 green, 4 red",
    "13 green, 3 red, 8 blue; 15 green; 4 blue, 1 red; 8 red, 4 green, 2 blue; 18 blue, 4 red, 9 green",
    "3 blue, 8 red, 16 green; 2 blue, 13 red, 18 green; 8 red, 9 green",
    "1 red, 7 green, 3 blue; 10 green, 10 red, 10 blue; 5 blue, 8 red, 14 green; 10 blue, 5 green, 2 red; 10 green, 10 red, 16 blue",
    "3 blue, 1 green, 6 red; 2 blue, 5 red; 3 blue, 2 red, 9 green",
    "5 blue, 2 green, 1 red; 7 blue, 3 red, 7 green; 13 green, 4 blue, 3 red; 1 blue, 9 green; 1 red, 13 green, 3 blue",
    "1 red, 1 blue, 13 green; 1 green; 2 blue, 16 green; 3 blue, 17 green, 1 red; 4 blue, 1 red; 5 blue, 1 red",
    "5 red, 8 green, 1 blue; 16 blue, 2 red; 7 blue, 7 red, 6 green; 2 blue, 6 green, 4 red; 4 green, 3 red, 5 blue; 3 green, 9 blue, 3 red",
    "7 green, 3 red, 2 blue; 1 blue, 1 green, 1 red; 15 blue; 4 red, 11 blue; 1 red, 1 green, 2 blue",
    "20 red, 4 blue, 7 green; 11 red, 16 green, 7 blue; 7 red, 15 green, 11 blue; 10 red, 9 blue, 13 green; 12 red, 12 blue, 17 green",
    "5 blue, 4 green; 1 red, 1 blue, 9 green; 9 green, 6 blue, 1 red; 6 blue, 4 green, 1 red",
    "2 blue; 2 blue, 1 green; 4 green, 2 red, 1 blue",
    "7 blue, 12 green, 1 red; 8 blue, 3 green, 1 red; 3 red, 1 blue, 10 green; 7 green, 15 blue",
    "3 blue, 19 green, 7 red; 14 blue, 8 green, 8 red; 2 red, 1 green, 5 blue; 8 red, 8 blue, 17 green; 1 blue, 10 red, 18 green; 4 green, 11 red, 8 blue",
    "12 blue, 4 green; 9 blue, 1 green, 2 red; 2 red, 3 blue, 3 green; 1 red, 4 green, 14 blue",
    "2 red, 1 blue, 7 green; 5 red, 5 green, 1 blue; 2 blue, 6 red, 5 green; 3 green, 2 blue; 6 red, 1 blue; 5 green, 4 red, 1 blue",
    "2 blue, 3 green, 2 red; 1 blue, 4 green, 5 red; 4 green, 3 blue, 6 red",
    "10 green, 12 blue; 3 red, 8 blue, 8 green; 1 green, 10 blue, 2 red; 4 blue, 4 green",
    "5 green, 11 blue, 4 red; 2 blue, 5 green, 7 red; 16 red, 2 green, 5 blue; 2 red, 1 green, 10 blue",
    "11 blue, 5 red, 7 green; 15 green, 9 blue; 3 red, 4 green, 6 blue; 2 green, 14 blue, 6 red; 2 red, 11 green, 4 blue; 12 blue, 10 green",
    "1 red, 13 blue, 4 green; 2 green, 1 red, 6 blue; 6 green, 14 blue",
    "5 blue, 9 green, 1 red; 17 blue, 1 red; 11 green, 13 blue; 7 green, 13 blue; 2 blue, 4 green; 7 blue, 5 green",
    "17 green, 3 blue; 15 green, 5 blue, 1 red; 12 green, 1 red, 4 blue; 1 red, 10 blue, 16 green; 12 green, 6 blue, 1 red",
    "4 red; 2 green, 5 blue, 5 red; 3 red, 5 blue",
    "5 red, 1 green; 16 green, 14 blue, 10 red; 1 red, 15 blue, 15 green",
    "5 green, 14 red; 9 red, 6 green, 1 blue; 9 green, 4 red, 1 blue; 3 green, 1 blue, 7 red; 1 blue, 1 red, 2 green",
    "2 red, 2 blue; 8 red, 5 blue; 6 blue, 1 green, 4 red",
    "1 blue, 1 red; 2 green, 8 red; 7 red, 2 green; 2 blue, 5 green, 5 red",
    "18 blue, 1 red, 6 green; 1 red, 8 green; 5 blue, 7 green; 4 blue, 2 green; 8 blue, 4 green",
    "10 red, 3 blue; 10 red, 3 green, 4 blue; 3 blue, 1 green; 4 red, 3 green, 6 blue; 5 red, 3 green, 5 blue",
    "8 red, 7 green; 11 green, 14 red; 11 red, 1 blue, 7 green; 1 blue, 18 red; 10 red, 12 green, 1 blue",
    "11 blue, 6 green, 1 red; 6 red, 12 green, 6 blue; 14 blue, 6 red; 11 blue, 3 red, 6 green",
    "7 blue, 4 green, 5 red; 2 green, 4 red, 7 blue; 4 red; 1 blue, 5 red",
    "7 green, 10 blue, 11 red; 13 red, 19 blue; 11 green, 11 red; 8 green, 18 blue, 4 red; 5 green, 19 blue, 12 red; 10 green, 6 blue, 2 red",
    "1 green, 5 red; 4 green, 13 blue, 6 red; 5 green, 2 red, 13 blue",
    "1 blue, 2 green, 5 red; 13 red, 4 green, 3 blue; 8 red; 3 green, 1 red; 6 red, 4 green, 2 blue",
    "2 green, 15 red; 3 green, 12 red; 2 blue, 2 green, 4 red; 4 blue, 8 red; 1 green, 4 blue, 14 red; 2 blue, 2 green, 6 red",
    "3 green, 5 blue, 1 red; 5 green, 6 red, 3 blue; 13 red, 9 green, 8 blue; 11 green, 15 red, 3 blue; 16 red, 8 blue, 17 green; 8 green, 5 red",
    "1 red, 3 green; 1 blue; 2 green; 3 red, 1 blue; 1 green, 3 red, 2 blue",
    "2 red, 13 green, 3 blue; 3 red, 2 blue, 7 green; 2 blue, 3 red, 9 green; 7 blue, 1 red, 4 green; 6 red, 14 blue, 2 green; 1 green, 2 red, 14 blue",
    "5 blue, 2 green, 1 red; 1 blue, 6 red, 4 green; 4 red, 2 blue, 6 green; 4 red, 2 blue, 8 green; 4 green, 1 blue",
    "7 green, 3 blue; 2 red, 4 green, 6 blue; 2 red, 5 blue; 1 blue, 5 green",
    "20 green, 4 red; 13 green, 12 blue, 7 red; 15 blue, 16 red, 7 green; 14 green, 13 red, 2 blue; 11 green, 6 red, 8 blue; 10 green, 13 red",
    "10 blue, 13 green, 3 red; 3 red, 16 green, 7 blue; 5 blue, 6 green, 2 red; 4 green, 1 blue, 2 red",
    "2 green, 7 red, 1 blue; 8 red, 10 green; 5 red, 5 blue",
    "4 green, 13 blue, 5 red; 1 red, 2 green, 3 blue; 2 red, 7 green, 14 blue; 1 red, 2 green, 2 blue; 13 blue, 5 red",
    "10 blue, 3 green, 6 red; 12 blue, 1 red, 3 green; 13 green, 16 blue, 4 red",
    "7 green, 4 red, 4 blue; 6 red; 6 red, 4 green, 9 blue; 1 red, 2 blue",
    "3 blue, 11 green; 12 green; 10 green, 4 red, 6 blue",
    "8 green, 12 red, 9 blue; 4 green, 6 blue, 1 red; 9 blue, 4 green; 6 blue, 7 green, 11 red; 11 blue, 18 red, 7 green; 4 green, 11 red, 1 blue",
    "9 green, 1 red, 7 blue; 3 red, 15 blue, 9 green; 3 blue, 1 red, 5 green; 10 red, 15 blue, 3 green",
    "2 red, 3 blue, 2 green; 1 green, 4 blue, 5 red; 7 red, 8 blue; 2 green, 2 blue, 8 red",
    "6 blue, 4 red, 1 green; 1 green, 4 red, 9 blue; 3 green, 8 blue; 3 red, 3 blue; 8 blue, 2 green",
    "2 red, 1 green, 3 blue; 6 blue, 3 red; 2 red, 1 green, 4 blue",
    "1 blue, 10 green; 13 red, 8 green, 4 blue; 7 red, 1 green, 4 blue",
    "7 red, 7 green, 1 blue; 1 red, 5 green, 2 blue; 16 red, 10 green, 4 blue; 1 blue, 12 green, 3 red",
    "15 red, 7 blue, 1 green; 19 blue, 3 red; 2 blue, 1 green, 4 red",
    "9 green; 5 red, 8 green, 1 blue; 1 blue, 5 red, 7 green",
    "16 red, 3 green, 2 blue; 1 blue, 6 green, 14 red; 12 blue, 17 red; 11 blue, 13 red, 5 green; 2 blue, 20 red, 3 green; 9 red, 8 blue, 2 green",
    "7 green, 3 blue, 6 red; 4 green, 7 blue, 5 red; 6 green, 3 red, 7 blue; 5 green, 3 red, 8 blue; 6 red, 9 blue, 11 green",
    "11 green, 4 red, 5 blue; 7 green, 2 red, 1 blue; 4 red, 1 green, 8 blue",
    "2 green, 7 red, 5 blue; 18 red, 3 green, 3 blue; 6 red, 2 blue, 5 green; 6 red, 5 blue, 3 green; 7 green, 6 blue, 8 red",
    "4 red; 3 red, 5 green, 1 blue; 3 red, 2 blue, 2 green",
    "2 green, 15 red, 10 blue; 3 red, 8 blue; 20 red, 5 blue, 2 green; 11 blue, 2 green, 20 red; 7 blue, 18 red",
    "1 red, 4 green, 2 blue; 7 green, 9 red, 2 blue; 3 red, 3 green, 1 blue; 8 red, 2 blue, 2 green; 2 red, 8 green, 2 blue; 5 green, 8 red",
    "2 blue, 4 red; 1 blue, 3 green, 4 red; 5 green, 3 red, 4 blue; 1 green, 4 red, 6 blue",
    "1 green, 1 blue, 2 red; 1 red, 13 blue, 4 green; 3 red, 14 blue, 15 green",
    "3 green, 7 red; 2 red, 3 green, 1 blue; 4 green, 1 blue, 4 red; 1 red",
    "9 blue, 8 red, 3 green; 10 blue, 3 red; 7 blue, 2 green, 7 red; 4 red, 11 blue, 3 green; 8 red, 9 blue, 2 green",
    "5 green, 8 blue; 3 blue, 4 red, 16 green; 1 green, 5 red, 6 blue",
    "6 blue, 9 green; 3 green, 6 blue; 5 blue, 1 red",
]

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

const loop = () => {
    for(const [index, game] of test.entries()) {
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

            // console.log(set)
        }

        // console.log(game)
        // console.log(JSON.stringify(counts))

        
        // for(const color in counts) {
        //     if(counts[color] > maxCubes[color]) {
        //         isValid = false
        //     }
        // }

        const gameId = index + 1

        if(isValid){
            validGames.push(parseInt(gameId))
        } else {
            console.log(`invalid game ${gameId}`, counts)
        }
    }
}

loop();

const totalScore = validGames.reduce((prev, cur) => prev+cur, 0)

console.log({totalScore, validGames})