// this is dbpost.js
var Post = require('./model.js').Post

exports.setup = function (app) {
    app.get('/find/:user', find)
}

function find(req, res) {
    findByAuthor(req.params.user, function (items) {
        res.send({items: items})
    })
}

//////////////////////////////
// remove these examples

function findByAuthor(author, callback) {
    Post.find({author: author}).exec(function (err, items) {
        console.log('There are ' + items.length + ' entries for ' + author)
        var totalLength = 0
        items.forEach(function (post) {
            totalLength += post.body.length
        })
        console.log('average length', totalLength / items.length)
        callback(items)
    })
}

new Post({id: 1, author: 'sep1', img: null, date: new Date().getTime(), body: 'This is my first post'}).save()
new Post({id: 2, author: 'sep1', img: null, date: new Date().getTime(), body: 'This is my second post'}).save()
new Post({id: 3, author: 'sep1', img: null, date: new Date().getTime(), body: 'This is shuo\'s post'}).save()
new Post({id: 4, author: 'sep1', img: null, date: new Date().getTime(), body: 'This is shuo\'s post'}).save()
new Post({id: 5, author: 'sep1', img: null, date: new Date().getTime(), body: 'This is shuo\'s post'}).save()
new Post({
    id: 6,
    author: 'jmg3',
    img: null,
    date: new Date().getTime(),
    body: "This is Max's post"
}).save(function (result) {
    console.log('done with save', result)


    findByAuthor('sep1', function () {
        findByAuthor('jmg3', function () {
            console.log('complete')
            process.exit()
        })
    })
})

//////////////////////////////