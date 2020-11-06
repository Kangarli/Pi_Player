const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3532

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const setMusicList = []
const setCoverList = []

app.get('/', (req, res) => {
    res.send('piplayer')
})




app.post('/checkMusicList', (req, res) => {
    const musicList = req.body
    setMusicList.push(musicList)
})

app.post('/getMusicList', (req, res) => {
    res.status(200).send(setMusicList)
})





app.post('/checkMusicCovers', (req, res) => {
    const coverList = req.body
    setCoverList.push(coverList)
})

app.post('/getMusicCovers', (req, res) => {
    res.status(200).send(setCoverList)
})


app.listen(process.env.PORT || port)