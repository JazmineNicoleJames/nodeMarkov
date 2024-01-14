/** Command-line tool to generate Markov text. */
const axios = require('axios')
const markov = require('./markov')
const process = require('process')
const fs = require('fs')

function file(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.error(`Error reading ${data}`)
        } else {
            console.log(data)
        }
    })
}


async function webCat(url) {
    try{
        let res = await axios.get(url);
        console.log(res.data);
    } catch(err) {
        console.error(`Error getting text from ${url}`);
    }

}

let path = process.argv[2];

if(path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    file(path);
}