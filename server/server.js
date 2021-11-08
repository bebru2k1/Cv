require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
//DB
const db = require('./models')
const Role = db.role
const PORT = process.env.PORT


//Route
const authRoute = require('./routes/auth.route')
const postsRoute = require('./routes/post.route')
const commentRoute = require('./routes/comment.route')
const Post = require('./models/Post')
// connect Db
db.connect()

app.use(express.json())
app.use(cors())

// route
app.use('/v1/api/auth', authRoute)
app.use('/v1/api/posts', postsRoute)
app.use('/v1/api/comments', commentRoute)



app.listen(PORT, () => {
    console.log(`Server run in ${PORT}`)
})