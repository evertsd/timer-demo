var globalTimerVar;

var Timer = function() {
  this.$playBtn = $('[data-play-btn]');
  this.$pauseBtn = $('[data-pause-btn]');
  this.$stopBtn = $('[data-stop-btn]');
  this.$timeDisplay = $('[data-time-display]');
  this.serverTime = this.$timeDisplay.attr('[data-server-time]') || 0;
  this.time = this.serverTime;
  this.refreshedAt = new Date();
  this.timeForInterval = 1000;
  this.interval;


  this.$playBtn.on('click', this.start.bind(this));
  this.$pauseBtn.on('click', this.stop.bind(this));
  this.$stopBtn.on('click', function() {
    this.stop();
    this.time = 0;
    this.serverTime = 0;
  }.bind(this));

  if (!!this.$timeDisplay.attr('[data-is-running]')) {
    this.start();
  }

  return this;
};

Timer.prototype.start = function() {
  this.refreshedAt = new Date();
  this.interval = setInterval(function() {
    this.time = this.currentTime();
    this.updateDisplay();
  }.bind(this), this.timeForInterval);
}

Timer.prototype.stop = function() {
  this.serverTime = this.currentTime();
  clearInterval(this.interval);
  this.updateDisplay();
}

Timer.prototype.currentTime = function() {
  return parseInt(this.serverTime + ((new Date() - this.refreshedAt) / 1000));
}

Timer.prototype.updateDisplay = function() {
  this.$timeDisplay.html(this.time);
}

$(document).on('ready', function() {
  globalTimerVar = new Timer();
});