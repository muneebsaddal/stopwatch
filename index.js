let startButton = document.getElementById("startButton"),
   stopButton = document.getElementById("stopButton"),
   resetButton = document.getElementById("resetButton"),
   flagButton = document.getElementById("flagButton"),
   hoursCounter = document.getElementById("counter-h"),
   minutesCounter = document.getElementById("counter-m"),
   secondsCounter = document.getElementById("counter-s"),
   msCounter = document.getElementById("counter-ms"),
   altHoursCounter = document.getElementById("alt-counter-h"),
   altMinutesCounter = document.getElementById("alt-counter-m"),
   altSecondsCounter = document.getElementById("alt-counter-s"),
   altMsCounter = document.getElementById("alt-counter-ms"),
   hours = 0,
   minutes = 0,
   seconds = 0,
   milliseconds = 0,
   hoursSplit = 0,
   minutesSplit = 0,
   secondsSplit = 0,
   millisecondsSplit = 0,
   intHours = 0,
   intMinutes = 0,
   intSeconds = 0,
   intMilliseconds = 0,
   subHours = 0,
   subMinutes = 0,
   subSeconds = 0,
   subMilliseconds = 0,
   altHours = 0,
   altMinutes = 0,
   altSeconds = 0,
   altMilliseconds = 0,
   timeInterval,
   splitTimeInterval,
   flagsWrapper = document.getElementById("stopwatchFlags"),
   flags = [];

startButton.addEventListener("click", () => {
   clearInterval(timeInterval)
   clearInterval(splitTimeInterval)
   timeInterval = setInterval(startTimer, 10);
   splitTimeInterval = setInterval(startSplitTimer, 10)
});
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
flagButton.addEventListener("click", flag);

function startTimer() {
   milliseconds++;

   if (milliseconds <= 9) {
      msCounter.innerHTML = "0" + milliseconds;
   }

   if (milliseconds > 9) {
      msCounter.innerHTML = milliseconds;
   }

   if (milliseconds > 99) {
      milliseconds = 0;
      msCounter.innerHTML = "0" + milliseconds;
      seconds++;
   }

   if (seconds <= 9) {
      secondsCounter.innerHTML = "0" + seconds;
   }

   if (seconds > 9) {
      secondsCounter.innerHTML = seconds;
   }

   if (seconds > 59) {
      seconds = 0;
      minutes++;
   }

   if (minutes <= 9) {
      minutesCounter.innerHTML = "0" + minutes;
   }

   if (minutes > 9) {
      minutesCounter.innerHTML = minutes;
   }

   if (minutes > 59) {
      minutes = 0;
      hours++;
   }

   if (hours <= 9) {
      hoursCounter.innerHTML = "0" + hours;
   } else {
      hoursCounter.innerHTML = hours;
   }
}

function startSplitTimer() {
   altMilliseconds++;

   if (altMilliseconds <= 9) {
      altMsCounter.innerHTML = "0" + altMilliseconds;
   }

   if (altMilliseconds > 9) {
      altMsCounter.innerHTML = altMilliseconds;
   }

   if (altMilliseconds > 99) {
      altMilliseconds = 0;
      altMsCounter.innerHTML = "0" + altMilliseconds;
      altSeconds++;
   }

   if (altSeconds <= 9) {
      altSecondsCounter.innerHTML = "0" + altSeconds;
   }

   if (altSeconds > 9) {
      altSecondsCounter.innerHTML = altSeconds;
   }

   if (altSeconds > 59) {
      altSeconds = 0;
      altMinutes++;
   }

   if (altMinutes <= 9) {
      altMinutesCounter.innerHTML = "0" + altMinutes;
   }

   if (altMinutes > 9) {
      altMinutesCounter.innerHTML = altMinutes;
   }

   if (altMinutes > 59) {
      altMinutes = 0;
      altHours++;
   }

   if (altHours <= 9) {
      altHoursCounter.innerHTML = "0" + altHours;
   } else {
      altHoursCounter.innerHTML = altHours;
   }
}

function stopTimer() {
   let flagTime = `${hoursCounter.innerHTML}:${minutesCounter.innerHTML}:${secondsCounter.innerHTML}.${msCounter.innerHTML} Pause`;
   console.log(flagTime)
   if (flagTime != "00:00:00.00" && !flags.includes(flagTime)) {
      flags.push(flagTime);
      appendFlagToDOM(flagTime);
   }
   clearInterval(timeInterval);
   clearInterval(splitTimeInterval);
}

function resetTimer() {
   clearInterval(timeInterval);
   hours = 0;
   minutes = 0;
   seconds = 0;
   milliseconds = 0;
   hoursCounter.innerHTML = "0" + hours;
   minutesCounter.innerHTML = "0" + minutes;
   secondsCounter.innerHTML = "0" + seconds;
   msCounter.innerHTML = "0" + milliseconds;

   clearInterval(splitTimeInterval);
   altHours = 0;
   altMinutes = 0;
   altSeconds = 0;
   altMilliseconds = 0;
   altHoursCounter.innerHTML = "0" + altHours;
   altMinutesCounter.innerHTML = "0" + altMinutes;
   altSecondsCounter.innerHTML = "0" + altSeconds;
   altMsCounter.innerHTML = "0" + altMilliseconds;
   flags = [];
   flagsWrapper.innerHTML = "";
}

function flag() {

   intHours = parseInt(hoursCounter.innerHTML)
   intMinutes = parseInt(minutesCounter.innerHTML)
   intSeconds = parseInt(secondsCounter.innerHTML)
   intMilliseconds = parseInt(msCounter.innerHTML)

   subHours = intHours - hoursSplit
   subMinutes = intMinutes - minutesSplit
   subSeconds = intSeconds - secondsSplit
   subMilliseconds = intMilliseconds - millisecondsSplit

   if (subMilliseconds < 0) {
      subMilliseconds = subMilliseconds + 100
      subSeconds--
   }
   if (subSeconds < 0) {
      subSeconds = subSeconds + 60
      subMinutes--
   }
   if (subMinutes < 0) {
      subMinutes = subMinutes + 60
      subHours--
   }
   if (subHours < 0) {
      subHours = subHours + 12
   }

   let flagTime = `${subHours
      }:${subMinutes
      }:${subSeconds
      }.${subMilliseconds
      } Split`;

   millisecondsSplit = intMilliseconds
   secondsSplit = intSeconds
   minutesSplit = intMinutes
   hoursSplit = intHours

   console.log(flagTime)
   if (flagTime != "00:00:00.00" && !flags.includes(flagTime)) {
      flags.push(flagTime);
      appendFlagToDOM(flagTime);
   }

   clearInterval(splitTimeInterval);
   altHours = 0;
   altMinutes = 0;
   altSeconds = 0;
   altMilliseconds = 0;
   altMinutesCounter.innerHTML = "0" + altMinutes;
   altSecondsCounter.innerHTML = "0" + altSeconds;
   altMsCounter.innerHTML = "0" + altMilliseconds;
   altHoursCounter.innerHTML = "0" + altHours;
   splitTimeInterval = setInterval(startSplitTimer, 10)

}

function appendFlagToDOM(flagTime) {
   let newFlag = document.createElement("div");
   newFlag.classList.add("flag");
   newFlag.innerHTML = `
         <div class="flag__index">${flags.length}</div>
         <div class="flag__time">${flagTime}</div>
      `;
   flagsWrapper.appendChild(newFlag);
   flagsWrapper.scrollTop = flagsWrapper.scrollHeight;
}
