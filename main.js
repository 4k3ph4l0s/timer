// Global variables
const time_el1 = document.querySelector('.watch1 .time');
const count_el1 = document.querySelector('.watch1 .count');
const time_el2 = document.querySelector('.watch2 .time');
const count_el2 = document.querySelector('.watch2 .count');
const start_btn = document.getElementById("start");
const stop_btn = document.getElementById("stop");
const reset_btn = document.getElementById("reset");

let startFlag1 = true;
let startFlag2 = true;
let delay1 = 0;
let delay2 = 900; // 15 min countdown

const finishCount = 100;
const finishMsg = "";

const breakInterval = 25; // break after 25 laps
const breakDuration = 300; // 5 min break
let breakFlag1 = false;
let breakFlag2 = false;

let interval = null;
let seconds1 = 0;
let seconds2 = 0;
let count1 = 0;
let count2 = 0;

// 'Abgangszeiten'
let depTime1 = 120; // 2:00
let depTime2 = 135; // 2:15

// Event listeners
start_btn.addEventListener("click", start);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);

function formatTime(seconds) {
	let hrs = Math.floor(seconds / 3600);
	let mins = Math.floor((seconds - (hrs * 3600)) / 60);
	let secs = seconds % 60;

	if (secs < 10) secs = "0" + secs;
	if (mins < 10) mins = "0" + mins;
	if (hrs < 10) hrs = "0" + hrs;

	// return `${hrs}:${mins}:${secs}`; // with hours
	return `${mins}:${secs}`;
}

function timer() {
	seconds1++;
	seconds2++;

	// Lane 1
	// Delay
	if (startFlag1 && seconds1 < delay1) {
		time_el1.innerText = `Start in ${formatTime(delay1 - seconds1)}`;
		count_el1.innerText = "";
	}
	else if (startFlag1 && seconds1 == delay1) {
		time_el1.innerText = "00:00";
		count_el1.innerText = `${count1}`;
		startFlag1 = false;
		seconds1 = 0;
    }
	// Done
	else if (count1 == finishCount)
		time_el1.innerText = finishMsg;
	// Break step
	else if (breakFlag1 && seconds1 < breakDuration) {
		time_el1.innerText = `Pause ${formatTime(breakDuration - seconds1)}`;
	}
	else if (breakFlag1 && seconds1 == breakDuration) {
		time_el1.innerText = "00:00";
		breakFlag1 = false;
		seconds1 = 0;
	}
	// Regular step
	else if (seconds1 < depTime1)
		time_el1.innerText = `${formatTime(seconds1)}`;
	// Count step
	else {
		count1++;
		if (count1 && !(count1 % breakInterval)) {
			time_el1.innerText = `Pause ${formatTime(breakDuration)}`;
			breakFlag1 = true;
		}
		else
			time_el1.innerText = '00:00';
		count_el1.innerText = `${count1}`;
		seconds1 = 0;
	}


	// Lane 2
	if (startFlag2 && seconds2 < delay2) {
		time_el2.innerText = `Start in ${formatTime(delay2 - seconds2)}`;
		count_el2.innerText = "";
	}
	else if (startFlag2 && seconds2 == delay2) {
		time_el2.innerText = "00:00";
		count_el2.innerText = `${count2}`;
		startFlag2 = false;
		seconds2 = 0;
	}
	else if (count2 == finishCount)
		time_el2.innerText = finishMsg;
	else if (breakFlag2 && seconds2 < breakDuration) {
		time_el2.innerText = `Pause ${formatTime(breakDuration - seconds2)}`;
	}
	else if (breakFlag2 && seconds2 == breakDuration) {
		time_el2.innerText = "00:00";
		breakFlag2 = false;
		seconds2 = 0;
	}
	else if (seconds2 < depTime2)
		time_el2.innerText = `${formatTime(seconds2)}`;
	else {
		count2++;
		if (count2 && !(count2 % breakInterval)) {
			time_el2.innerText = `Pause ${formatTime(breakDuration)}`;
			breakFlag2 = true;
		}
		else
			time_el2.innerText = '00:00';
		count_el2.innerText = `${count2}`;
		seconds2 = 0;
	}
}

function start() {
	if (interval) {
		return
	}

	delay1 = finishCount * (depTime2 - depTime1) + delay2;
	interval = setInterval(timer, 1000);
}

function stop() {
	if (interval) {
		start_btn.innerText = 'Weiter';
	}

	clearInterval(interval);
	interval = null;
}

function reset () {
	stop();
	seconds1 = 0;
	seconds2 = 0;
	breakFlag1 = false;
	breakFlag2 = false;
	startFlag1 = true;
	startFlag2 = true;
	time_el1.innerText = '00:00';
	count1 = 0;
	count_el1.innerText = '0';
	time_el2.innerText = '00:00';
	count2 = 0;
	count_el2.innerText = '0';

	start_btn.innerText = 'Start';
}