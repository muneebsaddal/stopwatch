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
	if (character == null) character = "0";

	let result = number.toString();

	for (let i = result.length; i <= length; i++) {
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

	return text;
};

let interval = 0;
let start = 0;
let split = 0;

const display = document.getElementById("display");
const times = document.getElementById("times");

const startStopwatch = () => {
	if (interval) return;

	start = new Date();

	if (split) {
		times.style.display = "none";
		times.innerHTML = "";
		split = null;
	}

	const tick = () => {
		const now = new Date();

		if (split) {
			display.innerHTML =
				'<div class="total-time">' +
				renderTime(start, now) +
				"</div>" +
				'<div class="split-time">' +
				renderTime(split, now) +
				"</div>";
		} else {
			display.innerHTML =
				'<div class="total-time">' +
				renderTime(start, now) +
				"</div>" +
				'<div class="split-heading">Split Time</div>';
		}
	};
	interval = setInterval(tick, 10);
};

const stopStopwatch = () => {
	if (interval) {
		clearInterval(interval);
		interval = null;
	}
};

const splitTime = () => {
	if (interval) {
		const now = new Date();

		if (split == null) {
			times.innerHTML +=
				'<div class="split-time">' + renderTime(start, now) + "</div>";
			times.style.display = "block";
		} else {
			times.innerHTML +=
				'<div class="split-time">' + renderTime(start, now) + "</div>";
		}

		split = now;
	}
};
