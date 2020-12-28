const express = require('express')
const mongoose = require('mongoose')
const router = require('./route')

const app = express()


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
mongoose.set('useFindAndModify', false);

app.use('/contact', router)

app.get('/', (req, res) => {
    res.send('<h1>Worked</h1>')
})


const port = process.env.PORT || 8080

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database connected")
        app.listen(port, () => {
            console.log(`Server is running at port ${port}`)
        })
    })
    .catch((e) => {
        console.log(e)
    })