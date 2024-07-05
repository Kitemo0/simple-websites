var minutesInput = document.getElementById("inputMin");
var secondsInput = document.getElementById("inputSek");
var startButton = document.getElementById("startButton");
var resetButton = document.getElementById("resetButton");
var progressBar = document.getElementById("progressBar");
var colonStyle = document.getElementById("colonStyle");

var progressBarMax;
var changeSeconds = 0;
var changeMinutes = 0;
var stopper;

var setTime = function() {
    clearTimeout(stopper);
    var getMinutes = parseInt(minutesInput.value);
    var getSeconds = parseInt(secondsInput.value);

    /* seconds logic */
    if (getSeconds <= 9 && getSeconds >= 0) {
        var originalValue = secondsInput.value;
        secondsInput.value = ("0" + originalValue).slice(-2);
    } else if (getSeconds >= 60 || isNaN(getSeconds)) {
        secondsInput.value = "00";
        changeSeconds = 0;
    } else {
        secondsInput.value = getSeconds;
    }

    /* minutes logic */
    if (isNaN(getMinutes) || getMinutes < 0) {
        minutesInput.value = 0;
    }
    changeMinutes = parseInt(minutesInput.value);
    minutesInput.value = changeMinutes;
    changeMinutes = changeMinutes * 60;
    changeSeconds = parseInt(secondsInput.value);
    var totalTime = changeSeconds + changeMinutes;
    progressBar.value = 0;
    progressBar.setAttribute("max", totalTime);
    progressBarMax = totalTime;
}

minutesInput.addEventListener("keyup", setTime);
minutesInput.addEventListener("click", setTime);
secondsInput.addEventListener("keyup", setTime);
secondsInput.addEventListener("click", setTime);

/** main countdown **/
var progressCountdown = function() {
    secondsInput.classList.add("form_active");
    minutesInput.classList.add("form_active");
    colonStyle.classList.add("form_active");

    minutesInput.disabled = true;
    secondsInput.disabled = true;
    
    stopper = setTimeout(progressCountdown, 1000);
    
    var secondsValue = parseInt(secondsInput.value);
    var minutesValue = parseInt(minutesInput.value);

    if (secondsValue === 0 && minutesValue > 0) {
        secondsInput.value = 59;
        minutesInput.value = minutesValue - 1;
    } else if (secondsValue > 0) {
        secondsInput.value = ("0" + (secondsValue - 1)).slice(-2);
    }

    progressBar.value += 1;

    if (progressBar.value >= progressBarMax) {
        clearTimeout(stopper);
        // Reset the form and styles when countdown finishes
        secondsInput.classList.remove("form_active");
        minutesInput.classList.remove("form_active");
        colonStyle.classList.remove("form_active");
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        alert("Countdown finished!");
    }
}

startButton.addEventListener("click", function() {
    setTime();
    progressCountdown();
});

resetButton.addEventListener("click", function() {
    clearTimeout(stopper);
    progressBar.value = 0;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    secondsInput.classList.remove("form_active");
    minutesInput.classList.remove("form_active");
    colonStyle.classList.remove("form_active");
    minutesInput.value = "";
    secondsInput.value = "";
});
