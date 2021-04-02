// const fetch = require('node-fetch')
const requestPromise = require('request-promise')

let inputs = [process.argv[2], process.argv[3], process.argv[4]]

// const callUrl = url => fetch(url).then(response => response.text())
const callUrl = url => requestPromise(url)

const promisesArray = inputs.map(url => callUrl(url))

Promise.all(promisesArray)
    .then(resultsArr => resultsArr.forEach(result => console.log(result)))
    .catch(error => console.log(error))