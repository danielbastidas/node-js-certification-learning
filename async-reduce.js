/** This program is similar to the waterfall example, the result of the previous task is passed to next one
 * but the main difference is that in this case the returned values from the previous tasks could be reduced
 * so thats why we are using async.reduce
 */
const http = require('http')
const async = require('async')

const url = process.argv[2]

async.reduce(['one', 'two', 'three'], 0, function (memo, item, callback) {

    let response = ''
    http.get(url + '?number=' + item, res => {
        res
            .on('data', chunk => {
                response += chunk.toString()
            })
            .on('end', () => {
                callback(null, memo + Number.parseInt(response))
            })

    }).on('error', err => callback(err))

}, function (err, result) {
    if (err) console.log(err)
    console.log(result)
});