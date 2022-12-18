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

let seconds = 0;
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
	// Update the global timer
	seconds++;

	// Update the lane timers and counters
	if (count1 == finishCount)
		time_el1.innerText = finishMsg;
	else if (seconds && seconds % depTime1)
		time_el1.innerText = `${formatTime(seconds - count1 * depTime1)}`;
	else {
		time_el1.innerText = '00:00';
		count1++;
		count_el1.innerText = `${count1}`;
	}
	if (count2 == finishCount)
		time_el2.innerText = finishMsg;
	else if (seconds && seconds % depTime2)
		time_el2.innerText = `${formatTime(seconds - count2 * depTime2)}`;
	else {
		time_el2.innerText = '00:00';
		count2++;
		count_el2.innerText = `${count2}`;
	}
	if (count3 == finishCount)
		time_el3.innerText = finishMsg;
	else if (seconds && seconds % depTime3)
		time_el3.innerText = `${formatTime(seconds - count3 * depTime3)}`;
	else {
		time_el3.innerText = '00:00';
		count3++;
		count_el3.innerText = `${count3}`;
	}
	if (count4 == finishCount)
		time_el4.innerText = finishMsg;
	else if (seconds && seconds % depTime4)
		time_el4.innerText = `${formatTime(seconds - count4 * depTime4)}`;
	else {
		time_el4.innerText = '00:00';
		count4++;
		count_el4.innerText = `${count4}`;
	}
}

function start() {
	if (interval) {
		return
	}

	interval = setInterval(timer, 1000);
}

function stop () {
	clearInterval(interval);
	interval = null;

	start_btn.innerText = 'Weiter';
}

function reset () {
	stop();
	seconds = 0;
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