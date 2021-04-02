const http = require('http')
const async = require('async')

/** Execute function in parallel with arguments returning the result of the function in an array
 * Useful to perform post request for example without caring about the response. The order of the post calls can't be 
 * determine
 * Using async.map the results of each operation ain't lost
 */
async.map([process.argv[2], process.argv[3]], function (item, callback) {

    let body = ''
    http.get(item, res => {
        res
            .on('data', chunk => {
                body += chunk.toString()
            })
            .on('end', () => { callback(null, body) })
            .on('error', () => { callback(error) })
    }).on('error', error => { callback })
}, (error, results) => {
    if (error) console.log(error)
    console.log(results)
})