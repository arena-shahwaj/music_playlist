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
}

// Play/Pause Toggle
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
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
