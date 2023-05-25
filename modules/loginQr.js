window.onload = function () {
    let minute = 3;
    let seconds = 0;
    const timer = document.getElementById("timer");
    let secondsTimer = setInterval(timerFunc, 1000);
    let counter = 0;

    function timerFunc() {
        seconds--;
        counter++;
        if (minute === 3 || counter % 60 === 0) {
            seconds = 59;
            minute--;
        }
        timer.innerHTML = `0${minute}분 ${ seconds < 10 ? `0${seconds}` : seconds}초`;

        if (minute === 0 && seconds === 0) {
            stop();
            return;
        }
    }

    function stop() {
        clearInterval(secondsTimer);
        clearInterval(minuteTimer);
    }

    function setMinutes() {
        minute--;
    }
};