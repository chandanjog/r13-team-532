class RaceController < WebsocketRails::BaseController

  def create
    send_message :create_success, "Yayyy", :namespace => :races
  end

end