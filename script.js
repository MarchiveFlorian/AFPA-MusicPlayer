let musics = [
    { file: "Blue_Skies.mp3", title: "Blue Skies", artist: "Nom artiste 1" },
    { file: "Cartoon_Hoedown.mp3", title: "Cartoon Hoedown", artist: "Nom artiste 2" },
    { file: "Earthy_Crust.mp3", title: "Earthy Crust", artist: "Nom artiste 3" },
    { file: "Hold_On_a_Minute.mp3", title: "Hold on a Minute", artist: "Nom artiste 4" },
    { file: "JohnDunbarTheme.mp3", title: "John Dunbar Theme", artist: "Nom artiste 5" },
    { file: "Stay_With_You.mp3", title: "Stay with you", artist: "Nom artiste 6" },
    { file: "Symphony_No_5_by_Beethoven.mp3", title: "Symphony n°5", artist: "Beethoven" }
];
let currentMusicIndex = 0;
let currentMusicVolume = 1;
let mediaplayer = document.getElementById("mediaplayer");
let searchInput = document.getElementById("searchInput");

window.onload = function () {
    mediaplayer.src = musics[currentMusicIndex].file;
    mediaplayer.volume = currentMusicVolume;
    updateMusicInfo();
};

function play() {
    mediaplayer.play();
}

function pause() {
    mediaplayer.pause();
}

function next() {
    currentMusicIndex = (currentMusicIndex + 1) % musics.length;
    mediaplayer.src = musics[currentMusicIndex].file;
    updateMusicInfo();
    play();
}

function previous() {
    currentMusicIndex = (currentMusicIndex - 1 + musics.length) % musics.length;
    mediaplayer.src = musics[currentMusicIndex].file;
    updateMusicInfo();
    play();
}

function lowerSound() {
    currentMusicVolume = Math.max(currentMusicVolume - 0.1, 0);
    mediaplayer.volume = currentMusicVolume;
    document.getElementById("volumeSlider").value = currentMusicVolume * 100;
}

function increaseSound() {
    currentMusicVolume = Math.min(currentMusicVolume + 0.1, 1);
    mediaplayer.volume = currentMusicVolume;
    document.getElementById("volumeSlider").value = currentMusicVolume * 100;
}

function updateMusicInfo() {
    document.getElementById("artistName").textContent = musics[currentMusicIndex].artist;
    document.getElementById("musicName").textContent = musics[currentMusicIndex].title;
}

function getTimeValue(){
    document.getElementById("progSlider").value = (mediaplayer.currentTime / mediaplayer.duration) * 100;
}

document.querySelectorAll('.cards').forEach((card) => {
    card.addEventListener('click', function () {
        let index = this.getAttribute('data-index');
        currentMusicIndex = parseInt(index);
        mediaplayer.src = musics[currentMusicIndex].file;
        updateMusicInfo();
        play();
    });
});

document.getElementById("playButton").addEventListener("click", function () {
    if (mediaplayer.paused) {
        play();
    } else {
        pause();
    }
})

document.getElementById("nextButton").addEventListener("click", function () {
    next();
})

document.getElementById("previousButton").addEventListener("click", function () {
    previous();
})

document.getElementById("lowSoundButton").addEventListener("click", function () {
    lowerSound();
})

document.getElementById("highSoundButton").addEventListener("click", function () {
    increaseSound();
})

document.getElementById("volumeSlider").addEventListener("change", function () {
    mediaplayer.volume = this.value / 100;
})

mediaplayer.addEventListener("timeupdate", function () {
    if (!isNaN(mediaplayer.duration)) {
        getTimeValue();
    }
});

document.getElementById("progSlider").addEventListener("input", function () {
    mediaplayer.currentTime = (this.value / 100) * mediaplayer.duration;
});

searchInput.addEventListener("input", function () {
    let filter = searchInput.value.toLowerCase();
    let cards = document.querySelectorAll(".cards");
    cards.forEach(function(card) {
        let musicName = card.querySelector(".cardsTitle").textContent.toLowerCase();
        if (musicName.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});