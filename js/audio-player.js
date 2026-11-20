document.addEventListener('DOMContentLoaded', () => {
  const players = Array.from(document.querySelectorAll('.audio-player'));
  let activeAudio = null;
  let activePlayer = null;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '--:--';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  }

  players.forEach((player) => {
    const source = player.dataset.audioSrc.trim();
    const button = player.querySelector('.audio-play-button');
    const progress = player.querySelector('.audio-progress');
    const time = player.querySelector('.audio-time');
    const status = player.querySelector('.audio-status');

    if (!source) {
      button.disabled = true;
      progress.disabled = true;
      status.textContent = 'Local audio file not added yet';
      return;
    }

    const audio = new Audio(source);
    audio.preload = 'metadata';
    status.textContent = 'Ready to play';

    audio.addEventListener('loadedmetadata', () => {
      time.textContent = `0:00 / ${formatTime(audio.duration)}`;
    });

    audio.addEventListener('timeupdate', () => {
      const value = audio.duration ? (audio.currentTime / audio.duration) * 1000 : 0;
      progress.value = String(value);
      time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    audio.addEventListener('ended', () => {
      player.classList.remove('is-playing');
      button.setAttribute('aria-label', button.getAttribute('aria-label').replace('Pause', 'Play'));
      progress.value = '0';
      status.textContent = 'Ready to play';
      activeAudio = null;
      activePlayer = null;
    });

    audio.addEventListener('error', () => {
      button.disabled = true;
      progress.disabled = true;
      status.textContent = 'Audio file could not be loaded';
    });

    button.addEventListener('click', async () => {
      if (audio.paused) {
        if (activeAudio && activeAudio !== audio) {
          activeAudio.pause();
          activePlayer.classList.remove('is-playing');
          activePlayer.querySelector('.audio-status').textContent = 'Paused';
        }
        await audio.play();
        player.classList.add('is-playing');
        button.setAttribute('aria-label', button.getAttribute('aria-label').replace('Play', 'Pause'));
        status.textContent = 'Playing';
        activeAudio = audio;
        activePlayer = player;
      } else {
        audio.pause();
        player.classList.remove('is-playing');
        button.setAttribute('aria-label', button.getAttribute('aria-label').replace('Pause', 'Play'));
        status.textContent = 'Paused';
        activeAudio = null;
        activePlayer = null;
      }
    });

    progress.addEventListener('input', () => {
      if (audio.duration) audio.currentTime = (Number(progress.value) / 1000) * audio.duration;
    });
  });
});
