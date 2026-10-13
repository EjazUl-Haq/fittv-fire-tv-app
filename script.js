 let timerInterval = null;
let currentDuration = 900; // 15 Mins in seconds
let remainingTime = currentDuration;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const statusMessage = document.getElementById('statusMessage');
const cards = document.querySelectorAll('.card');
const navigables = document.querySelectorAll('.navigable');

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function playCompletionSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.value = 587.33; // D5 note
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  osc.start();
  osc.stop(ctx.currentTime + 0.6);
}

function startTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = 'Start Workout';
    statusMessage.textContent = 'Workout Paused';
    return;
  }

  isRunning = true;
  startBtn.textContent = 'Pause Workout';
  statusMessage.textContent = 'Workout in Progress... Keep going!';

  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay(remainingTime);
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      startBtn.textContent = 'Start Workout';
      statusMessage.textContent = '🎉 Workout Completed! Great Job!';
      playCompletionSound();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  remainingTime = currentDuration;
  updateDisplay(remainingTime);
  startBtn.textContent = 'Start Workout';
  statusMessage.textContent = 'Ready to start!';
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    currentDuration = parseInt(card.getAttribute('data-time'), 10);
    resetTimer();
  });
});

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Remote Control / D-Pad Arrow Navigation Logic
let currentIndex = 0;
navigables[currentIndex].focus();

document.addEventListener('keydown', (e) => {
  if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
    currentIndex = (currentIndex + 1) % navigables.length;
    navigables[currentIndex].focus();
  } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
    currentIndex = (currentIndex - 1 + navigables.length) % navigables.length;
    navigables[currentIndex].focus();
  } else if (e.key === 'Enter') {
    document.activeElement.click();
  }
});

updateDisplay(remainingTime);