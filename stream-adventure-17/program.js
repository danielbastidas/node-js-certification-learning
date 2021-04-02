const concat = require('concat-stream')
const crypto = require("crypto")
const tar = require('tar')

const parser = new tar.Parse()
const decryptStream = crypto.createDecipheriv(process.argv[2], process.argv[3], process.argv[4])


parser.on('entry', function (entry) {
    if (entry.type === "Directory") {
        // continue the processing
        return entry.resume()
    } else {

        let hash = crypto.createHash('md5', { encoding: 'hex' })
        entry.pipe(hash).pipe(concat(body => {
            console.log(`${body} ${entry.path}`)
        }))

    }

})

process.stdin.pipe(decryptStream).pipe(parser)