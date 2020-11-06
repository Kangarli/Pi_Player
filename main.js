const electron = require('electron');
const fs = require('fs');
const axios = require('axios')

var musics = fs.readdirSync('./Music');
var covers = fs.readdirSync('./Covers');

const { app, BrowserWindow, Menu, globalShortcut } = electron;

function createWindow() {
    var win = new BrowserWindow({
        width: 1200,
        height: 650,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + './styles/icons/icon.png'
    })
    // Menu.setApplicationMenu(null)
    win.loadFile('index.html')
}

axios.post('http://localhost:3532/checkMusicList', musics)
axios.post('http://localhost:3532/checkMusicCovers', covers)

app.whenReady().then(createWindow)