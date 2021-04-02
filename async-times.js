/** This program show how to use nested async functions and also shows how to use async times
 * to execute an asynchronous task several times
 */
const async = require('async')
const http = require('http')

const opts = {
    hostname: process.argv[2],
    port: process.argv[3],
    path: '/users/create',
    method: 'POST'
}

var createUser = function (id, callback) {

    var req = http.request(opts, res => { })
    req.on('error', console.log)
    let user = {
        user_id: id + 1
    }

    req.write(JSON.stringify(user))
    req.end()

    callback(null)
}

async.series({
    requestOne: function (callback) {
        async.times(5, function (n, next) {
            createUser(n, function (err, user) {
                next(err, user)
            })
        }, function (err, users) {
            // console.log('being executed')
            if (err) callback(err)
            callback(null)
        })
    },
    requestTwo: function (callback) {
        opts.path = '/users'
        opts.method = 'GET'
        let result = ''
        http.request(opts, res => {
            res
                .on('data', chunk => {
                    result += chunk.toString()
                })
                .on('end', () => {
                    callback(null, result)
                })
        }).on('error', console.log).end()
    }
}, function (error, result) {
    if (error) console.log(error)
    // result['requestTwo'] also works, but notice we are using the series function passing objects instead of 
    // functions so thats why the next statement works
    console.log(result.requestTwo)

})