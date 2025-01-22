// DOM Elements
const splash = document.querySelector('.splash');
const app = document.querySelector('.app');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const trackTitle = document.getElementById('track-title');
const playlistItems = document.querySelectorAll('.playlist li');

// Audio Player
const audio = new Audio();
let currentTrackIndex = 0;

// Splash Animation
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    splash.classList.add('hidden');
    app.classList.remove('hidden');
  }, 5000);
});

// Load Track
function loadTrack(index) {
  const track = playlistItems[index].getAttribute('data-track');
  trackTitle.textContent = playlistItems[index].textContent;
  audio.src = track;
  audio.load(); // Ensure the audio is loaded before playing
  progress.value = 0; // Reset progress bar when a new track is loaded
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Set to play icon on track load
}

// Play/Pause Toggle
playPauseBtn.addEventListener('click', () => {
  if (audio.src) { // Check if a track is loaded
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Pause icon
    } else {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Play icon
    }
  }
});

// Next/Previous Track
nextBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlistItems.length;
  loadTrack(currentTrackIndex);
  audio.play();
});

prevBtn.addEventListener('click', () => {
  currentTrackIndex =
    (currentTrackIndex - 1 + playlistItems.length) % playlistItems.length;
  loadTrack(currentTrackIndex);
  audio.play();
});

// Select Track from Playlist
playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentTrackIndex = index;
    loadTrack(currentTrackIndex);
    audio.play();
  });
});

// Update Progress Bar as the Track Plays
audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
  }
});

// Update Audio Time when Progress Bar is clicked
progress.addEventListener('input', () => {
  const progressTime = (progress.value / 100) * audio.duration;
  audio.currentTime = progressTime;
});

// Reset Play/Pause Button when Audio Ends
audio.addEventListener('ended', () => {
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Play icon when the song ends
});
