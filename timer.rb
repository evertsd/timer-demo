# attributes: { id: int, latest_start: datetime,
#   time: int, status: # string, enum, int your choice }
class Timer
  attr_reader :status, :time, :latest_start

  PAUSED = 'paused'
  ACTIVE = 'active'
  STOPPED = 'stopped'

  def initialize
    @status = STOPPED
    @time = 0
    @latest_start = nil
  end

  def start
    return if status == ACTIVE
    @latest_start = Time.now
    @status = ACTIVE
  end

  def pause
    return if status == PAUSED
    @time = current_time
    @status = PAUSED
  end

  def reset
    return if status == STOPPED
    @time = 0
    @latest_start = nil
    @status = STOPPED
  end

  def current_time
    @time + time_since_latest_start
  end

  private

  def time_since_latest_start
    return 0 if @status == PAUSED || @latest_start.nil?
    Time.now - @latest_start
  end
end