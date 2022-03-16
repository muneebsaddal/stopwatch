const time = document.getElementById("stopwatch");
const splitTime = document.getElementById("splitwatch");
const splitTimeHeading = document.getElementById("splitTime-heading");
const mainButton = document.getElementById("mainButton");
const splitButton = document.getElementById("splitButton");
const resetButton = document.getElementById("resetButton");
const stopwatch = { elapsedTime: 0 };
const splitwatch = { elapsedTime: 0 };
const splitsWrapper = document.getElementById("stopwatchsplits")

mainButton.addEventListener("click", () => {
	if (mainButton.innerHTML === "Start") {
		startStopwatch();
		// startSplitwatch();
		mainButton.innerHTML = "Stop";
		mainButton.style.backgroundColor = "#f82f2f";
		splitButton.disabled = false;
	} else {
		stopwatch.elapsedTime += Date.now() - stopwatch.startTime;
		// splitwatch.elapsedTime += Date.now() - splitwatch.startTime;
		clearInterval(stopwatch.intervalId);
		// clearInterval(splitwatch.intervalId);
		mainButton.innerHTML = "Start";
		mainButton.style.backgroundColor = "#2F8CF8";
		splitButton.disabled = true;
		resetButton.disabled = false;
		appendsplitToDOM(stopwatch.elapsedTime, "Pause")
	}
});

// splitButton.addEventListener("click", () => {
// 	splitTimeHeading.style.display = "none";
// 	splitTime.style.display = "block";
// 	startSplitwatch();
// });

resetButton.addEventListener("click", () => {
	stopwatch.elapsedTime = 0;
	stopwatch.startTime = Date.now();
	displayTime(0, 0, 0, 0, time);
	// displayTime(0, 0, 0, 0, splitTime);
	splitsWrapper.innerHTML = "";
	document.getElementById("stopwatchsplits").style.backgroundColor ="#e5e5e5";
});

function startStopwatch() {
	stopwatch.startTime = Date.now();
	stopwatch.intervalId = setInterval(() => {
		const elapsedTime =
			Date.now() - stopwatch.startTime + stopwatch.elapsedTime;
		const milliseconds = parseInt(elapsedTime % 1000);
		const seconds = parseInt((elapsedTime / 1000) % 60);
		const minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
		const hour = parseInt((elapsedTime / (1000 * 60 * 60)) % 24);
		displayTime(hour, minutes, seconds, milliseconds, time);
	}, 100);
}

// function startSplitwatch() {
// 	splitwatch.startTime = Date.now();
// 	splitwatch.intervalId = setInterval(() => {
// 		const elapsedTime = Date.now() - splitwatch.startTime;
// 		const milliseconds = parseInt(elapsedTime % 1000);
// 		const seconds = parseInt((elapsedTime / 1000) % 60);
// 		const minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
// 		const hour = parseInt((elapsedTime / (1000 * 60 * 60)) % 24);
// 		displayTime(hour, minutes, seconds, milliseconds, splitTime);
// 	}, 100);
// }

function displayTime(hour, minutes, seconds, milliseconds, display) {

	const leadZeroTime = [hour, minutes, seconds, milliseconds].map((display) =>
		display < 10 ? `0${display}` : display
	);
	display.innerHTML = leadZeroTime.join(":");
}

function stopTimer() {
	startButtonFlag = true;
	if (startButtonFlag == true) {
		document.getElementById("startButton").style.display = "inline";
		document.getElementById("stopButton").style.display = "none";
		document.getElementById("resetButton").disabled = false;
		document.getElementById("splitButton").disabled = true;
	}

	let splitTime = `${hoursCounter.innerHTML}:${minutesCounter.innerHTML}:${secondsCounter.innerHTML}.${msCounter.innerHTML}`;
	let splitType = "Pause";

	if (splitTime != "00:00:00.00" && !splits.includes(splitTime)) {
		splits.push(splitTime);
		appendsplitToDOM(splitTime, splitType);
	}

	interval++;

	clearInterval(pauseInterval);
	pauseInterval = setInterval(pauseTimer, 10);

	// pauseHours = hoursCounter.innerHTML;
	// pauseMinutes = minutesCounter.innerHTML;
	// pauseSeconds = secondsCounter.innerHTML;
	// pauseMilliseconds = msCounter.innerHTML;

	clearInterval(timeInterval);
	clearInterval(splitTimeInterval);
}

function resetTimer() {
	document.getElementById("resetButton").disabled = true;
	document.getElementById("stopwatchsplits").style.backgroundColor =
		"#e5e5e5";

	clearInterval(timeInterval);
	hours = 0;
	minutes = 0;
	seconds = 0;
	milliseconds = 0;
	hoursCounter.innerHTML = "0" + hours;
	minutesCounter.innerHTML = "0" + minutes;
	secondsCounter.innerHTML = "0" + seconds;
	msCounter.innerHTML = "0" + milliseconds;

	splitFlag = true;
	if (splitFlag == true) {
		document.getElementById("stopwatch-alt").style.display = "none";
		document.getElementById("splitTime-heading").style.display = "flex";
	}

	clearInterval(splitTimeInterval);
	altHours = 0;
	altMinutes = 0;
	altSeconds = 0;
	altMilliseconds = 0;
	altHoursCounter.innerHTML = "0" + altHours;
	altMinutesCounter.innerHTML = "0" + altMinutes;
	altSecondsCounter.innerHTML = "0" + altSeconds;
	altMsCounter.innerHTML = "0" + altMilliseconds;
	splits = [];
	splitsWrapper.innerHTML = "";
}

function split() {
	splitFlag = true;
	if (splitFlag == true) {
		document.getElementById("stopwatch-alt").style.display = "flex";
		document.getElementById("splitTime-heading").style.display = "none";
		document.getElementById("stopwatchsplits").style.backgroundColor =
			"white";
	}

	intHours = parseInt(hoursCounter.innerHTML);
	intMinutes = parseInt(minutesCounter.innerHTML);
	intSeconds = parseInt(secondsCounter.innerHTML);
	intMilliseconds = parseInt(msCounter.innerHTML);

	subHours = intHours - hoursSplit;
	subMinutes = intMinutes - minutesSplit;
	subSeconds = intSeconds - secondsSplit;
	subMilliseconds = intMilliseconds - millisecondsSplit;

	if (subMilliseconds < 0) {
		subMilliseconds = subMilliseconds + 100;
		subSeconds--;
	}
	if (subSeconds < 0) {
		subSeconds = subSeconds + 60;
		subMinutes--;
	}
	if (subMinutes < 0) {
		subMinutes = subMinutes + 60;
		subHours--;
	}
	if (subHours < 0) {
		subHours = subHours + 12;
	}

	if (subHours < 9) {
		subHours = "0" + subHours;
	}

	if (subMinutes < 9) {
		subMinutes = "0" + subMinutes;
	}

	if (subSeconds < 9) {
		subSeconds = "0" + subSeconds;
	}

	if (subMilliseconds < 9) {
		subMilliseconds = "0" + subMilliseconds;
	}

	let splitTime = `${subHours}:${subMinutes}:${subSeconds}.${subMilliseconds}`;
	let splitType = "Split";

	millisecondsSplit = intMilliseconds;
	secondsSplit = intSeconds;
	minutesSplit = intMinutes;
	hoursSplit = intHours;

	if (splitTime != "00:00:00.00" && !splits.includes(splitTime)) {
		splits.push(splitTime);
		appendsplitToDOM(splitTime, splitType);
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
	splitTimeInterval = setInterval(startSplitTimer, 10);
}

function appendsplitToDOM(elapsedTime, splitType) {
	
	document.getElementById("stopwatchsplits").style.backgroundColor =
		"white";

	let milliseconds = parseInt(elapsedTime % 1000);
	let seconds = parseInt((elapsedTime / 1000) % 60);
	let minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
	let hour = parseInt((elapsedTime / (1000 * 60 * 60)) % 24);
	
	hour = hour < 10 ? `0${hour}` : hour
	minutes = minutes < 10 ? `0${minutes}` : minutes
	seconds = seconds < 10 ? `0${seconds}` : seconds
	milliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds

	const splitTime = `${hour}:${minutes}:${seconds}.${milliseconds}`;

	let newsplit = document.createElement("div");
	newsplit.classList.add("split");
	newsplit.innerHTML = `
         <div id="split-index" class="split-index">${stopwatch.intervalId}</div>
         <div id="split-time" class="split-time">${splitTime}</div>
		 <div id="split-type" class="split-type">${splitType}</div>
      `;
	splitsWrapper.appendChild(newsplit);
	splitsWrapper.scrollTop = splitsWrapper.scrollHeight;
}
