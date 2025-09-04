const songs = [
    { name: "Song 1", file: "song1.mp3" },
    { name: "Song 2", file: "song2.mp3" },
    { name: "Song 3", file: "song3.mp3" },
    { name: "Song 4", file: "song4.mp3" },
    { name: "Song 5", file: "song5.mp3" },
    { name: "Song 6", file: "song6.mp3" },
    { name: "Song 7", file: "song7.mp3" },
    { name: "Song 8", file: "song8.mp3" },
    { name: "Song 9", file: "song9.mp3" },
    { name: "Song 10", file: "song10.mp3" },
];

let currentSong = 0;
let audio = new Audio(songs[currentSong].file);

const playBtn = document.querySelector('.player-control .player-icon:nth-child(3)');
const progressBar = document.querySelector('.progress-bar');
const currTime = document.querySelector('.curr-time');
const totTime = document.querySelector('.tot-time');
const volumeBar = document.querySelector('.valume-bar');

let isPlaying = false;

// Play/Pause functionality
playBtn.addEventListener('click', () => {
    if (!audio.src) return;
    if (isPlaying) {
        audio.pause();
        playBtn.style.opacity = 0.7;
    } else {
        audio.play();
        playBtn.style.opacity = 1;
    }
    isPlaying = !isPlaying;
});

// Load a song
function loadSong(index) {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio = new Audio(songs[index].file);

    // update events again
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('error', () => {
        alert(`${songs[index].file} file nahi mili!`);
    });

    if (isPlaying) {
        audio.play();
    }
}

// Next song
document.querySelector('.next').addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
});

// Previous song
document.querySelector('.prev').addEventListener('click', () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
});

// Update progress bar and time
function updateProgress() {
    if (audio.duration && !isNaN(audio.duration)) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = percent || 0;
        currTime.textContent = formatTime(audio.currentTime);
        totTime.textContent = formatTime(audio.duration);
    }
}

// Seek functionality
progressBar.addEventListener('input', () => {
    if (audio.duration && !isNaN(audio.duration)) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});

// Volume control
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});

// Helper function to format time
function formatTime(sec) {
    if (isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}