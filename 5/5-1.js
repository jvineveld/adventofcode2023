const { getInput } = require("../helper");

const init = async (test) => {
    const input = await getInput("input.txt");
    const content = input;

    const seeds = content.match(/seeds: (.*)/m)[1].split(" ")

    const maps = {
        /**
        [mapname: string]: {
            source: [
                {
                    start: 0,
                    end: 0
                }
            ],
            destination: [
                {
                    start: 0,
                    end: 0
                }
            ]
        }
        */
    }

    let curMap = ''
    for(const line of content.split("\n")) {
        if(line.includes("seeds") || line.trim() === '') {
            continue;
        }
        if(line.includes("map")){
            curMap = line.replace(" map:", "");
            maps[curMap] = {}

            continue;
        }

        const rangeConfig = line.split(" "),
            destStart = parseInt(rangeConfig[0]),
            sourceStart = parseInt(rangeConfig[1]),
            range = parseInt(rangeConfig[2])

        if(!maps[curMap].source) {
            maps[curMap] = {
                source: [
                    {
                        start: sourceStart,
                        end: sourceStart + range
                    }
                ],
                destination: [
                    {
                        start: destStart,
                        end: destStart + range
                    }
                ]
            }
        } else {
            maps[curMap].source.push({
                start: sourceStart,
                end: sourceStart + range
            })
            maps[curMap].destination.push({
                start: destStart,
                end: destStart + range
            })
        }

    }

    const mapEntity = (type, seednum) => {
        const map = maps[type]
        for(const [rangeIndex, sourceRange] of map.source.entries()) {
            const destRange = map.destination[rangeIndex]
            if(seednum>=sourceRange.start && seednum<=sourceRange.end) {
                return destRange.start + (seednum - sourceRange.start)
            }
        }

        return seednum;
    }

    const types = [
        "seed-to-soil",
        "soil-to-fertilizer",
        "fertilizer-to-water",
        "water-to-light",
        "light-to-temperature",
        "temperature-to-humidity",
        "humidity-to-location",
    ]

    const closesSeed = Math.min(...seeds.map(seed => types.reduce((val, type) => mapEntity(type, val), seed)))

    console.log(closesSeed)
}

init(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`);