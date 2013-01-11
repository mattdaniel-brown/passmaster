function IdleTimeout() {};

IdleTimeout.pollInterval = 60000;
IdleTimeout.idleTime = 0;
IdleTimeout.idleInterval = null;

IdleTimeout.startTimer = function() {
  if (userData.idleTimeout == 0)
    return;
  this.idleTime = 0;
  this.idleInterval = setInterval(this.incrementTimer, this.pollInterval);
  $(document).bind('mousemove', this.resetTimer);
  $(document).bind('keypress', this.resetTimer);
  $(document).bind('touchend', this.resetTimer);
};

IdleTimeout.stopTimer = function() {
  clearInterval(this.idleInterval);
  this.idleInterval = null;
  $(document).unbind('mousemove', this.resetTimer);
  $(document).unbind('keypress', this.resetTimer);
  $(document).unbind('touchend', this.resetTimer);
};

IdleTimeout.resetTimer = function() {
  if (IdleTimeout.idleTime > 0 && IdleTimeout.idleTime == userData.idleTimeout - 1)
    $('#idle_timeout').hide();
  IdleTimeout.idleTime = 0;
  clearInterval(IdleTimeout.idleInterval);
  IdleTimeout.idleInterval = setInterval(IdleTimeout.incrementTimer, IdleTimeout.pollInterval);
};

IdleTimeout.incrementTimer = function() {
  IdleTimeout.idleTime++;
  if (IdleTimeout.idleTime == userData.idleTimeout - 1)
    $('#idle_timeout').show();
  if (IdleTimeout.idleTime >= userData.idleTimeout) {
    $('#idle_timeout').hide();
    Accounts.lock();
  }
};
