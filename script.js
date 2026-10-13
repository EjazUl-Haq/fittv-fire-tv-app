let countdown;
let timeLeft = 90; // 90 seconds default
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

function updateTimerDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    
    minutesDisplay.textContent = mins < 10 ? '0' + mins : mins;
    secondsDisplay.textContent = secs < 10 ? '0' + secs : secs;
}

startBtn.addEventListener('click', function() {
    // Prevent multiple intervals running together
    clearInterval(countdown);
    
    startBtn.textContent = "Running...";
    
    countdown = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(countdown);
            alert("Workout Completed!");
            startBtn.textContent = "Start Workout";
        }
    }, 1000);
});

resetBtn.addEventListener('click', function() {
    clearInterval(countdown);
    timeLeft = 90;
    updateTimerDisplay();
    startBtn.textContent = "Start Workout";
});