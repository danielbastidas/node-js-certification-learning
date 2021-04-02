const http = require('http')
const async = require('async')

/** Execute function in parallel with arguments without returning data. 
 * Useful to perform post request for example without caring about the response. The order of the post calls can't be 
 * determine
 * Using async.each the results of each operation are lost
 */
async.each([process.argv[2], process.argv[3]], function (item, callback) {
    // console.log(item)
    // return callback('')
    http.get(item, res => {
        res
            .on('data', chunk => { })
            .on('end', () => { callback('') })
            .on('error', () => { callback })
    }).on('error', error => { callback })
}, error => {
    if (error) console.log(error)
})