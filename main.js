// Global variables
const time_el1 = document.querySelector('.watch1 .time');
const count_el1 = document.querySelector('.watch1 .count');
const time_el2 = document.querySelector('.watch2 .time');
const count_el2 = document.querySelector('.watch2 .count');
const time_el3 = document.querySelector('.watch3 .time');
const count_el3 = document.querySelector('.watch3 .count');
const time_el4 = document.querySelector('.watch4 .time');
const count_el4 = document.querySelector('.watch4 .count');
const start_btn = document.getElementById("start");
const stop_btn = document.getElementById("stop");
const reset_btn = document.getElementById("reset");

const finishCount = 100;
const finishMsg = 'Done!';
const breakInterval = 25; // break after 25 laps
const breakDuration = 600; // 10 min break
let breakFlag1 = false;
let breakFlag2 = false;
let breakFlag3 = false;
let breakFlag4 = false;

let seconds1 = 0;
let seconds2 = 0;
let seconds3 = 0;
let seconds4 = 0;
let interval = null;
let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;

// 'Abgangszeiten'
let depTime1 = 120; // 2:00
let depTime2 = 130; // 2:10
let depTime3 = 140; // 2:20
let depTime4 = 150; // 2:30

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
	seconds3++;
	seconds4++;

	// Lane 1
	// Done
	if (count1 == finishCount)
		time_el1.innerText = finishMsg;
	// Break step
	else if (breakFlag1 && seconds1 < breakDuration) {
		time_el1.innerText = `${formatTime(breakDuration - seconds1)} Pause`;
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
			time_el1.innerText = `${formatTime(breakDuration)} Pause`;
			breakFlag1 = true;
		}
		else
			time_el1.innerText = '00:00';
		count_el1.innerText = `${count1}`;
		seconds1 = 0;
	}


	// Lane 2
	if (count2 == finishCount)
		time_el2.innerText = finishMsg;
	else if (breakFlag2 && seconds2 < breakDuration) {
		time_el2.innerText = `${formatTime(breakDuration - seconds2)} Pause`;
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
			time_el2.innerText = `${formatTime(breakDuration)} Pause`;
			breakFlag2 = true;
		}
		else
			time_el2.innerText = '00:00';
		count_el2.innerText = `${count2}`;
		seconds2 = 0;
	}

	// Lane 3
	if (count3 == finishCount)
		time_el3.innerText = finishMsg;
	else if (breakFlag3 && seconds3 < breakDuration) {
		time_el3.innerText = `${formatTime(breakDuration - seconds3)} Pause`;
	}
	else if (breakFlag3 && seconds3 == breakDuration) {
		time_el3.innerText = "00:00";
		breakFlag3 = false;
		seconds3 = 0;
	}
	else if (seconds3 < depTime3)
		time_el3.innerText = `${formatTime(seconds3)}`;
	else {
		count3++;
		if (count3 && !(count3 % breakInterval)) {
			time_el3.innerText = `${formatTime(breakDuration)} Pause`;
			breakFlag3 = true;
		}
		else
			time_el3.innerText = '00:00';
		count_el3.innerText = `${count3}`;
		seconds3 = 0;
	}

	// Lane 4
	if (count4 == finishCount)
		time_el4.innerText = finishMsg;
	else if (breakFlag4 && seconds4 < breakDuration) {
		time_el4.innerText = `${formatTime(breakDuration - seconds4)} Pause`;
	}
	else if (breakFlag4 && seconds4 == breakDuration) {
		time_el4.innerText = "00:00";
		breakFlag4 = false;
		seconds4 = 0;
	}
	else if (seconds4 < depTime4)
		time_el4.innerText = `${formatTime(seconds4)}`;
	else {
		count4++;
		if (count4 && !(count4 % breakInterval)) {
			time_el4.innerText = `${formatTime(breakDuration)} Pause`;
			breakFlag4 = true;
		}
		else
			time_el4.innerText = '00:00';
		count_el4.innerText = `${count4}`;
		seconds4 = 0;
	}
}

function start() {
	if (interval) {
		return
	}

	interval = setInterval(timer, 10); // reset to 1000 for real time
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
	seconds3 = 0;
	seconds4 = 0;
	breakFlag1 = false;
	breakFlag2 = false;
	breakFlag3 = false;
	breakFlag4 = false;
	time_el1.innerText = '00:00';
	count1 = 0;
	count_el1.innerText = '0';
	time_el2.innerText = '00:00';
	count2 = 0;
	count_el2.innerText = '0';
	time_el3.innerText = '00:00';
	count3 = 0;
	count_el3.innerText = '0';
	time_el4.innerText = '00:00';
	count4 = 0;
	count_el4.innerText = '0';

	start_btn.innerText = 'Start';
}