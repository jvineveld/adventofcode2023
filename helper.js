const fs = require("fs")

function getInput(path){
    return new Promise((res, rej) => {
        try {
            const fileContents = fs.readFileSync(path, {
                encoding: "utf-8"
            })
            res(fileContents)
        } catch (error) {
            rej(error)
        }
    })
}


exports.getInput = getInput