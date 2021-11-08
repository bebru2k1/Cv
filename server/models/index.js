const mongoose = require('mongoose')
const User = require('./User')
const Comment = require('./Comment')
const Post = require('./Post')

const connect = async () => {

    try {
        await mongoose.connect(`mongodb+srv://BlogAurora:${process.env.DB_PASSWORD}@blog.62krl.mongodb.net/Blog?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Success Database Okay')
    } catch (error) {
        console.log(error)
    }
}
let db = {}
const ROLES = ['admin', "user"]
db.user = User
db.comment = Comment
db.post = Post
db.ROLES = ROLES
db.connect = connect


module.exports = db
