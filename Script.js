let songs = [];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const fileInput = document.getElementById("file-input");

// Load Song
function loadSong(index) {
    if (songs.length === 0) {
        title.textContent = "No Song Selected";
        artist.textContent = "Unknown Artist";
        return;
    }
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
}

// Play / Pause
function togglePlay() {
    if (songs.length === 0) return;
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

// Next Song
function nextSong() {
    if (songs.length === 0) return;
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
}

// Previous Song
function prevSong() {
    if (songs.length === 0) return;
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
}

// Update Progress
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Set Progress
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Format Time
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Add Songs from Hardware
fileInput.addEventListener("change", (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const wasEmpty = songs.length === 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newSong = {
            title: file.name.replace(/\.[^/.]+$/, ""), // remove file extension
            artist: "Local File",
            src: URL.createObjectURL(file)
        };
        songs.push(newSong);

        const li = document.createElement("li");
        li.textContent = newSong.title;
        const songIndex = songs.length - 1;
        li.addEventListener("click", () => {
            currentSong = songIndex;
            loadSong(currentSong);
            audio.play();
            playBtn.textContent = "⏸";
        });
        playlist.appendChild(li);
    }

    if (wasEmpty) {
        currentSong = 0;
        loadSong(currentSong);
    }
});

// Event Listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Initialize
loadSong(currentSong);
volume.value = 0.5;
audio.volume = 0.5;