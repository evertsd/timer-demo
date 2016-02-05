var globalTimerVar;

var Timer = function() {
  this.$playBtn = $('[data-play-btn]');
  this.$pauseBtn = $('[data-pause-btn]');
  this.$stopBtn = $('[data-stop-btn]');
  this.$timeDisplay = $('[data-time-display]');
  this.serverTime = this.$timeDisplay.attr('[data-server-time]') || 0;
  this.time = this.serverTime;
  this.status = Timer.STOPPED;
  this.refreshedAt = new Date();
  this.timeForInterval = 250;
  this.interval;

  this.$playBtn.on('click', this.start.bind(this));
  this.$pauseBtn.on('click', this.stop.bind(this));
  this.$stopBtn.on('click', function() {
    this.time = 0;
    this.serverTime = 0;
    this.status = Timer.STOPPED;
    this.stop();
  }.bind(this));

  if (!!this.$timeDisplay.attr('[data-is-running]')) {
    this.start();
  }

  return this;
};

Timer.STOPPED = 'stopped';
Timer.PAUSED = 'paused';
Timer.ACTIVE = 'active';

Timer.prototype.start = function() {
  if (this.status === Timer.ACTIVE) { return; }

  this.refreshedAt = new Date();
  this.interval = setInterval(function() {
    this.time = this.currentTime();
    this.updateDisplay();
  }.bind(this), this.timeForInterval);
  this.status = Timer.ACTIVE;
}

Timer.prototype.stop = function() {
  this.serverTime = this.currentTime();

  if(this.interval) {
    clearInterval(this.interval);
    this.interval = null;
  }
  
  this.updateDisplay();
  this.refreshedAt = null;
  this.status = Timer.PAUSED;
}

Timer.prototype.currentTime = function() {
  return parseInt(this.serverTime + this.timeSinceStart());
}

Timer.prototype.timeSinceStart = function() {
  if(!this.refreshedAt || this.status !== Timer.ACTIVE) { return 0; }
  return (new Date() - this.refreshedAt) / 1000;
}

Timer.prototype.updateDisplay = function() {
  this.$timeDisplay.html(this.time);
}

$(document).on('ready', function() {
  globalTimerVar = new Timer();
});