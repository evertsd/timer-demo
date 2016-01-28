# attributes: { id: int, latest_start: datetime,
#   time: int, status: # string, enum, int your choice }
class Timer
  PAUSED = 'paused'
  ACTIVE = 'active'

  def start
    return if status == ACTIVE
    self.latest_start = Time.now
    self.status = ACTIVE
  end

  def pause
    return if status == PAUSED
    self.time = current_time
    self.status = PAUSED
  end

  def current_time
    Time.now — latest_start
  end
end