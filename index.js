const calculatePeriod = (time_1, time_2) => {
	let timeDiff = time_2 - time_1;

	const units = [
		{ name: "milliseconds", scale: 1000 },
		{ name: "seconds", scale: 60 },
		{ name: "minutes", scale: 60 },
		{ name: "hours", scale: 24 },
	];

	const result = {};

	for (let i = 0; i < units.length; i++) {
		const total = Math.floor(timeDiff / units[i].scale);
		const rest = timeDiff - total * units[i].scale;

		result[units[i].name] = rest;
		timeDiff = total;
	}

	result.days = timeDiff;

	return result;
};

const padLeft = (number, length, character) => {
	if (character == null) character = 0;

	let result = number.toString();

	for (let i = result.length; i < length; i++) {
		result = character + result;
	}

	return result;
};

const renderTime = (time_1, time_2) => {
	const period = calculatePeriod(time_1, time_2);

	let text = "";

	if (period.days) {
		text += padLeft(period.days, 2) + " days ";
	}

	text += padLeft(period.hours, 2) + ":";
	text += padLeft(period.minutes, 2) + ":";
	text += padLeft(period.seconds, 2) + ":";
	text += padLeft(period.milliseconds, 3);

	const largeText = text.slice(0, 10);
	const smallText = text.replace(largeText, "");

	return [largeText, smallText];
};

let interval = 0;
let start = 0;
let split = 0;
let flag = false;

let display = document.getElementById("display");
let times = document.getElementById("times");
let splitTimes = document.getElementById("splitTimes");

document.getElementById("stop-button").style.display = "none";
document.getElementById("reset-button").disabled = true;
document.getElementById("split-button").disabled = true;

const startStopwatch = () => {
	if (interval) return;

	start = new Date();
	split = start;
	flag = true;
	const tick = () => {
		const now = new Date();

		let totalTime = renderTime(start, now);
		let splitTime = renderTime(split, now);
		splitTime = splitTime[0].concat(splitTime[1]);

		if (split) {
			display.innerHTML =
				'<div class="time-largeText">' +
				totalTime[0] +
				"</div>" +
				'<div class="time-smallText">' +
				totalTime[1] +
				"</div>";
			splitTimes.innerHTML =
				'<div class="split-heading">' + splitTime + "</div>";
		} else {
			display.innerHTML =
				'<div class="time-largeText">' +
				totalTime[0] +
				"</div>" +
				'<div class="time-smallText">' +
				totalTime[1] +
				"</div>";
		}
	};
	interval = setInterval(tick, 10);
	document.getElementById("start-button").style.display = "none";
	document.getElementById("stop-button").style.display = "block";
	document.getElementById("split-button").disabled = false;
};

const stopStopwatch = () => {
	if (interval) {
		clearInterval(interval);
		interval = 0;
		document.getElementById("start-button").style.display = "block";
		document.getElementById("stop-button").style.display = "none";
		document.getElementById("reset-button").disabled = false;
		document.getElementById("split-button").disabled = true;
	}
};

const splitTime = () => {
	if (interval) {
		const now = new Date();

		let timeStrings = renderTime(split, now);
		let time = timeStrings[0].concat(timeStrings[1]);

		if (split == 0) {
			times.innerHTML += '<div class="split-times">' + "</div>";
		} else {
			times.innerHTML += '<div class="split-times">' + time + "</div>"; // add <p> here for split/pause
		}

		split = now;
	}
};

const resetStopwatch = () => {
	if (interval) {
		clearInterval(interval);
		interval = 0;
		start = 0;
		split = 0;
	}
	times.innerHTML = '<div class="split-times"></div>';
	splitTimes.innerHTML =
		'<div id="splitTimes" class="split-heading">SPLIT TIME</div>';
	display.innerHTML =
		'<div class="time-largeText">' +
		"00:00:00.0" +
		"</div>" +
		'<div class="time-smallText">' +
		"00" +
		"</div>";
	document.getElementById("start-button").style.display = "block";
	document.getElementById("stop-button").style.display = "none";
	document.getElementById("reset-button").disabled = true;
};
