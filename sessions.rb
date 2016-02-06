# attributes: { id: int, latest_start: datetime,
#   time: int, status: # string, enum, int your choice }
class Timer
  attr_reader :status, :sessions, :current_session

  PAUSED = 'paused'
  ACTIVE = 'active'
  STOPPED = 'stopped'

  def initialize
    @status = STOPPED
    @sessions = []
  end

  def start
    return if status == ACTIVE

    @current_session = TimingSession.new
    @sessions.push(@current_session)
    @latest_start = Time.now
    @status = ACTIVE
  end

  def pause
    return if status != ACTIVE
    @current_session.stop
    @status = PAUSED
  end

  def reset
    return if status == STOPPED
    @sessions = []
    @current_session = nil
    @status = STOPPED
  end

  def current_time
    @sessions.map(&:time).inject(0, :+)
  end
end

class TimingSession
  attr_reader :start_time, :end_time

  def initialize
    @start_time = Time.now
  end

  def stop
    @end_time = Time.now
  end

  def time
    return Time.now - @start_time if @end_time.nil?
    @end_time - @start_time
  end
end

