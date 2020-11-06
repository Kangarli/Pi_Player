var musicList = []
var coverList = []

var currentSound = 0
var displaySoundName = document.getElementById('currentMusicName')

var timeBar = document.getElementById('timeBar')
var playerBar = document.getElementById('player__bar')

var playIcon = document.getElementById('playIcon')
var pasueIcon = document.getElementById('pauseIcon')

var randomIcon = document.getElementById('randomIcon')
var repeatIcon = document.getElementById('repeatIcon')

var currentDuration = document.getElementById('currentDuration')
var musicDuration = document.getElementById('musicDuration')

var blurImage = document.getElementById('blur')

let audio = new Audio

async function startPI() {
    await axios.post('http://localhost:3532/getMusicList')
        .then(res => musicList.push(res.data[0]) && res.data[0].map(musics => document.getElementById('musicList').appendChild(document.createElement('li')).appendChild(document.createTextNode(musics))))

    await axios.post('http://localhost:3532/getMusicCovers')
        .then(res => coverList.push(res.data[0]))

    startPlayMusic()
} startPI()
blurImage.style.backgroundImage = "url(./styles/icons/defaultCover.png)"

function startPlayMusic() {
    setInterval(() => {
        if (audio.currentTime === audio.duration) {
            if (randomPlaying && !repeatPlaying) {
                var randomSound = Math.floor(Math.random() * musicList[0].length)
                audio.src = "./Music/" + musicList[0][randomSound]
                let audioName = decodeURI(audio.src.replace('file:///E:/dev/player/client/Music/', ''))
                displaySoundName.innerHTML = audioName
                audio.play()
            } else if (!randomPlaying && repeatPlaying) {
                audio.src = "./Music/" + musicList[0][currentSound]
                let audioName = decodeURI(audio.src.replace('file:///E:/dev/player/client/Music/', ''))
                displaySoundName.innerHTML = audioName
                audio.play()
            } else if (!repeatPlaying && !randomPlaying) {
                playNext()
            }
        }

        setMusicCurrentTimeMin = Math.floor(audio.currentTime / 60)
        setMusicCurrentTimeSec = Math.floor(audio.currentTime) - (Math.floor(audio.currentTime / 60) * 60)

        setMusicDurationMin = Math.floor(audio.duration / 60)
        setMusicDurationSec = Math.floor(audio.duration) - (Math.floor(audio.duration / 60) * 60)

        currentDuration.innerHTML = setMusicCurrentTimeMin + " : " + setMusicCurrentTimeSec
        musicDuration.innerHTML = setMusicDurationMin + " : " + setMusicDurationSec

        timeBar.style.marginLeft = (audio.currentTime / audio.duration) * 100 + "%"

    }, 400);
}


// STATUS
var randomPlaying = false
var repeatPlaying = false


// VOLUME and MUSIC POINT
var volumeDot = document.getElementById('volume__dot')
var volumePath = document.getElementById('volume__controller')

volumePath.addEventListener('click', (e) => {
    var setVolume = (e.x - 691) / 100
    if (setVolume < 0 || setVolume > 1) {
        return;
    } else {
        audio.volume = setVolume
        volumeDot.style.marginLeft = e.x - 691
    }
})

function mute() {
    if (audio.volume === 0) {
        audio.volume = 1
        document.getElementById('muteIcon').style.display = 'none'
        document.getElementById('unmuteIcon').style.display = 'block'
    } else {
        document.getElementById('muteIcon').style.display = 'block'
        document.getElementById('unmuteIcon').style.display = 'none'
        audio.volume = 0
    }
}


// DETAILS
function playRandom() {
    if (randomPlaying) {
        randomIcon.style.color = "#000"
        randomPlaying = false
    } else {
        randomPlaying = true
        randomIcon.style.color = "#fff"
    }
}

function playRepeat() {
    if (repeatPlaying) {
        repeatIcon.style.color = "#000"
        repeatPlaying = false
    } else {
        repeatIcon.style.color = "#fff"
        repeatPlaying = true
    }
}


// CONTROLLERS
function playNext() {
    lastTime = undefined
    if (randomPlaying && !repeatPlaying) {
        currentSound = Math.floor(Math.random() * musicList[0].length)
        playCurrent()
    } else if (repeatPlaying && !randomPlaying) {
        playCurrent()
    } else {
        if (currentSound < (musicList[0].length - 1)) {
            currentSound++
            playCurrent()
        } else {
            currentSound = 0
            playCurrent()
        }
    }
}

function playPrev() {
    lastTime = undefined
    if (randomPlaying && !repeatPlaying) {
        currentSound = Math.floor(Math.random() * musicList[0].length)
        playCurrent()
    } else if (repeatPlaying && !randomPlaying) {
        playCurrent()
    } else {
        if (currentSound === 0) {
            currentSound = musicList[0].length - 1
            playCurrent()
        } else {
            currentSound--
            playCurrent()
        }
    }
}



// LISTENING
var lastTime;

function playCurrent() {
    audio.src = "./Music/" + musicList[0][currentSound]
    let audioName = decodeURI(audio.src.replace('file:///E:/dev/@END/player/client/Music/', ''))
    if (currentSound < (coverList[0].length)) {
        blurImage.style.backgroundImage = `url(./Covers/${coverList[0][currentSound]})`
    } else {
        blurImage.style.backgroundImage = `url(./styles/icons/defaultCover.png)`
    }
    displaySoundName.innerHTML = audioName
    playIcon.style.display = 'none'
    pasueIcon.style.display = 'block'
    audio.play()
    if (!(lastTime === undefined)) {
        audio.currentTime = lastTime
    }
}

function pauseCurrent() {
    playIcon.style.display = 'block'
    pasueIcon.style.display = 'none'
    lastTime = audio.currentTime
    audio.pause()
}