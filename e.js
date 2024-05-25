document.addEventListener("DOMContentLoaded", () => {
    let breakMinutes = 5;
    let sessionMinutes = 25;
    let secondsLeft = sessionMinutes * 60;
    let isRunning = false;
    let isSession = true;
    let timerInterval;

    const breakMinutesElement = document.getElementById("break-Minutes");
    const sessionMinutesElement = document.getElementById("session-Minutes");
    const secondsLeftElement = document.getElementById("time-left");
    const timerLabel = document.getElementById("timer-label");
    

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
    };

    const handleReset = () => {
        breakMinutes = 5;
        sessionMinutes = 25;
        secondsLeft = sessionMinutes * 60;
        isRunning = false;
        isSession = true;
        clearInterval(timerInterval);
        
        updateDisplay();
    };

    const handleStartStop = () => {
        if (isRunning) {
            clearInterval(timerInterval);
        } else {
            timerInterval = setInterval(() => {
                secondsLeft -= 1;
                if (secondsLeft < 0) {
                    if (isSession) {
                        secondsLeft = breakMinutes * 60;
                        isSession = false;
                    } else {
                        secondsLeft = sessionMinutes * 60;
                        isSession = true;
                    }
                    
                }
                updateDisplay();
            }, 1000);
        }
        isRunning = !isRunning;
    };

    const incrementBreak = () => {
        if (breakMinutes < 120) {
            breakMinutes += 1;
            if (!isRunning && !isSession) {
                secondsLeft = breakMinutes * 60;
            }
            updateDisplay();
        }
    };

    const decrementBreak = () => {
        if (breakMinutes > 1) {
            breakMinutes -= 1;
            if (!isRunning && !isSession) {
                secondsLeft = breakMinutes * 60;
            }
            updateDisplay();
        }
    };

    const incrementSession = () => {
        if (sessionMinutes < 120) {
            sessionMinutes += 1;
            if (!isRunning && isSession) {
                secondsLeft = sessionMinutes * 60;
            }
            updateDisplay();
        }
    };

    const decrementSession = () => {
        if (sessionMinutes > 1) {
            sessionMinutes -= 1;
            if (!isRunning && isSession) {
                secondsLeft = sessionMinutes * 60;
            }
            updateDisplay();
        }
    };   

    const updateDisplay = () => {
        breakMinutesElement.textContent = breakMinutes;
        sessionMinutesElement.textContent = sessionMinutes;
        secondsLeftElement.textContent = formatTime(secondsLeft);
        timerLabel.textContent = isSession ? "Session" : "Break";
    };


    document.getElementById("reset").addEventListener("click", handleReset);
    document.getElementById("start_stop").addEventListener("click", handleStartStop);
    document.getElementById("break-increment").addEventListener("click", incrementBreak);
    document.getElementById("break-decrement").addEventListener("click", decrementBreak);
    document.getElementById("session-increment").addEventListener("click", incrementSession);
    document.getElementById("session-decrement").addEventListener("click", decrementSession);

    updateDisplay();
});
