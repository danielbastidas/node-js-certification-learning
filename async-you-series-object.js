const async = require('async')
const http = require('http')

/** This program shows how to execute task in series returning the value in an array
 * The return value of each task is not passed to the next one
 */

let task = function (url, callback) {
    let response = ""
    http.get(url, res => {
        res.on('data', chunk => {
            response += chunk.toString()
        })
            .on('end', () => {
                callback(null, response)
            })
    }).on('error', error => {
        callback(error)
    })
}

async.series({
    requestOne: function (callback) {
        task(process.argv[2], callback)
    },
    requestTwo: function (callback) {
        task(process.argv[3], callback)
    }
}, function (error, result) {
    if (error) console.log(error)
    console.log(result)

})