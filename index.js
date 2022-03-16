const time = document.getElementById("stopwatch");
const splitTime = document.getElementById("splitwatch");
const splitTimeHeading = document.getElementById("splitTime-heading");
const mainButton = document.getElementById("mainButton");
const splitButton = document.getElementById("splitButton");
const resetButton = document.getElementById("resetButton");
const stopwatch = { elapsedTime: 0 };
const splitwatch = { elapsedTime: 0 };
let splitwatchValue = 0;
const splitsWrapper = document.getElementById("stopwatchsplits");
let count = 1;

mainButton.addEventListener("click", () => {
	if (mainButton.innerHTML === "Start") {
		startStopwatch();
		mainButton.innerHTML = "Stop";
		mainButton.style.backgroundColor = "#f82f2f";
		splitButton.disabled = false;
		resetButton.disabled = true;
	} else {
		stopwatch.elapsedTime += Date.now() - stopwatch.startTime;

		clearInterval(stopwatch.intervalId);

		mainButton.innerHTML = "Start";
		mainButton.style.backgroundColor = "#2F8CF8";
		splitButton.disabled = true;
		resetButton.disabled = false;
		appendsplitToDOM(stopwatch.elapsedTime, "Pause");
	}
});

splitButton.addEventListener("click", () => {
	if (mainButton.innerHTML === "Start") {
		splitwatch.elapsedTime += Date.now() - splitwatch.startTime;
		clearInterval(splitwatch.intervalId);
	} else {
		splitTimeHeading.style.display = "none";
		splitTime.style.display = "block";
		startSplitwatch();
		appendsplitToDOM(splitwatchValue, "Split");
	}
});

resetButton.addEventListener("click", () => {
	stopwatch.elapsedTime = 0;
	stopwatch.startTime = Date.now();
	splitwatch.elapsedTime= 0
	splitwatch.startTime = Date.now()
	displayTime(0, 0, 0, 0, time);
	displayTime(0, 0, 0, 0, splitTime);
	count = 1;
	splitsWrapper.innerHTML = "";
	document.getElementById("stopwatchsplits").style.backgroundColor =
		"#e5e5e5";
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

function startSplitwatch() {
	splitwatch.startTime = Date.now();
	splitwatch.intervalId = setInterval(() => {
		splitwatchValue = Date.now() - splitwatch.startTime;
		const milliseconds = parseInt(splitwatchValue % 1000);
		const seconds = parseInt((splitwatchValue / 1000) % 60);
		const minutes = parseInt((splitwatchValue / (1000 * 60)) % 60);
		const hour = parseInt((splitwatchValue / (1000 * 60 * 60)) % 24);
		displayTime(hour, minutes, seconds, milliseconds, splitTime);
	}, 100);
}

function displayTime(hour, minutes, seconds, milliseconds, display) {
	const leadZeroTime = [hour, minutes, seconds, milliseconds].map((display) =>
		display < 10 ? `0${display}` : display
	);
	display.innerHTML = leadZeroTime.join(":");
}

function appendsplitToDOM(elapsedTime, splitType) {
	document.getElementById("stopwatchsplits").style.backgroundColor = "white";

	let milliseconds = parseInt(elapsedTime % 1000);
	let seconds = parseInt((elapsedTime / 1000) % 60);
	let minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
	let hour = parseInt((elapsedTime / (1000 * 60 * 60)) % 24);

	hour = hour < 10 ? `0${hour}` : hour;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	seconds = seconds < 10 ? `0${seconds}` : seconds;
	milliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;

	const splitTime = `${hour}:${minutes}:${seconds}.${milliseconds}`;

	let newsplit = document.createElement("div");
	newsplit.classList.add("split");
	newsplit.innerHTML = `
         <div id="split-index" class="split-index">${count}</div>
         <div id="split-time" class="split-time">${splitTime}</div>
		 <div id="split-type" class="split-type">${splitType}</div>
      `;
	splitsWrapper.appendChild(newsplit);
	splitsWrapper.scrollTop = splitsWrapper.scrollHeight;
	count++;
}
