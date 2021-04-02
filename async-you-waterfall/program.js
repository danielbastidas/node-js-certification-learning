const async = require('async')
const file = require('fs')
const http = require('http')

/** This program show how to execute tasks in series passing the return value of the
 * previous task the next task
 */

async.waterfall([
    function (callback) {
        try {
            let url = file.readFileSync(process.argv[2]).toString()
            callback(null, url)
        } catch (error) {
            callback(error)
        }
    },
    function (url, callback) {
        let data = ''
        http
            .get(url, res => {
                res.on('data', res => {
                    data = res.toString()
                })

                res.on('end', () => {
                    callback(null, data)
                })
            })
            .on('error', error => {
                callback(error)
            })
    }
], (error, result) => {
    if (error) {
        console.log(error)
    }
    console.log(result)
})

