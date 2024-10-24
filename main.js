class TimerApp {
  constructor() {
    this.config = {
      finishCount: 100,
      breakInterval: 25,
      breakDuration: 300,
      lanes: [
        { id: 1, depTime: 110 }, // 1:50
        { id: 2, depTime: 120 }, // 2:00
        { id: 3, depTime: 135 }, // 2:15
        { id: 4, depTime: 135 }  // 2:15
      ],
      initialDelay: 15 * 60 // 15 minutes
    };

    this.state = {
      interval: null,
      lanes: this.config.lanes.map(lane => ({
        seconds: 0,
        count: 0,
        startFlag: true,
        breakFlag: false,
        delay: lane.id === 4 ? this.config.initialDelay : 0
      }))
    };

    this.initializeUI();
    this.setupEventListeners();
  }

  initializeUI() {
    const grid = document.querySelector('.timer-grid');
    
    this.config.lanes.forEach(lane => {
      const watch = document.createElement('div');
      watch.id = `watch${lane.id}`;
      watch.className = 'watch';
      watch.innerHTML = `
        <div class="lane">
          Bahn ${lane.id} (<span id="depTime${lane.id}">${this.formatTime(lane.depTime).slice(1)}</span>)
        </div>
        <div class="time">00:00</div>
        <div class="count">0</div>
      `;
      grid.appendChild(watch);
    });
  }

  setupEventListeners() {
    document.getElementById('start').addEventListener('click', () => this.start());
    document.getElementById('stop').addEventListener('click', () => this.stop());
    document.getElementById('reset').addEventListener('click', () => this.reset());
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  updateLaneDisplay(laneIndex) {
    const lane = this.state.lanes[laneIndex];
    const config = this.config.lanes[laneIndex];
    const timeEl = document.querySelector(`#watch${config.id} .time`);
    const countEl = document.querySelector(`#watch${config.id} .count`);

    if (lane.startFlag && lane.seconds < lane.delay) {
      timeEl.innerText = `Start in ${this.formatTime(lane.delay - lane.seconds)}`;
      countEl.innerText = '';
    } else if (lane.startFlag && lane.seconds === lane.delay) {
      this.initializeLane(laneIndex);
    } else if (lane.count === this.config.finishCount) {
      timeEl.innerText = '';
    } else if (lane.breakFlag) {
      this.handleBreak(laneIndex);
    } else if (lane.seconds < config.depTime) {
      timeEl.innerText = this.formatTime(lane.seconds);
    } else {
      this.incrementLap(laneIndex);
    }
  }

  initializeLane(laneIndex) {
    const lane = this.state.lanes[laneIndex];
    const timeEl = document.querySelector(`#watch${this.config.lanes[laneIndex].id} .time`);
    const countEl = document.querySelector(`#watch${this.config.lanes[laneIndex].id} .count`);
    
    timeEl.innerText = '00:00';
    countEl.innerText = `${lane.count}`;
    lane.startFlag = false;
    lane.seconds = 0;
  }

  handleBreak(laneIndex) {
    const lane = this.state.lanes[laneIndex];
    const timeEl = document.querySelector(`#watch${this.config.lanes[laneIndex].id} .time`);

    if (lane.seconds < this.config.breakDuration) {
      timeEl.innerText = `Pause ${this.formatTime(this.config.breakDuration - lane.seconds)}`;
    } else {
      timeEl.innerText = '00:00';
      lane.breakFlag = false;
      lane.seconds = 0;
    }
  }

  incrementLap(laneIndex) {
    const lane = this.state.lanes[laneIndex];
    const timeEl = document.querySelector(`#watch${this.config.lanes[laneIndex].id} .time`);
    const countEl = document.querySelector(`#watch${this.config.lanes[laneIndex].id} .count`);

    lane.count++;
    if (lane.count && !(lane.count % this.config.breakInterval)) {
      timeEl.innerText = `Pause ${this.formatTime(this.config.breakDuration)}`;
      lane.breakFlag = true;
    } else {
      timeEl.innerText = '00:00';
    }
    countEl.innerText = `${lane.count}`;
    lane.seconds = 0;
  }

  start() {
    if (this.state.interval) return;

    // Calculate delays based on lane 4
    const lane4 = this.config.lanes[3];
    this.state.lanes.forEach((lane, index) => {
      if (index < 3) {
        const currentLane = this.config.lanes[index];
        lane.delay = this.config.finishCount * (lane4 .depTime - currentLane.depTime) + 
                    this.state.lanes[3].delay - (lane4.depTime - currentLane.depTime);
      }
    });

    this.state.interval = setInterval(() => {
      this.state.lanes.forEach((lane, index) => {
        lane.seconds++;
        this.updateLaneDisplay(index);
      });
    }, 1000);
  }

  stop() {
    if (this.state.interval) {
      document.getElementById('start').innerText = 'Weiter';
      clearInterval(this.state.interval);
      this.state.interval = null;
    }
  }

  reset() {
    this.stop();
    this.state.lanes.forEach((lane, index) => {
      lane.seconds = 0;
      lane.count = 0;
      lane.startFlag = true;
      lane.breakFlag = false;
      lane.delay = index === 3 ? 60 : 0;

      const timeEl = document.querySelector(`#watch${this.config.lanes[index].id} .time`);
      const countEl = document.querySelector(`#watch${this.config.lanes[index].id} .count`);
      timeEl.innerText = '00:00';
      countEl.innerText = '0';
    });
    document.getElementById('start').innerText = 'Start';
  }
}

// Initialize the app
new TimerApp();