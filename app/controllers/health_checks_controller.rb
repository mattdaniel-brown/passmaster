class HealthChecksController < ActionController::Base

  def show
    if db_connected?
      render :plain => 'ok', :status => :ok
    else
      render :plain => 'error', :status => :error
    end
  end

  private

  def db_connected?
    ActiveRecord::Base.connection.active?
  rescue
    false
  end

end
