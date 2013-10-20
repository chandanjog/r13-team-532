class RaceController < WebsocketRails::BaseController

  def get
    #puts request.session_options[:id]
    races_awaiting_players = Race.where(:await_players_till.gt => Time.now.utc)
    race = races_awaiting_players.empty? ? Race.new : races_awaiting_players.first
    race.add_player(SecureRandom.uuid)
    race.save
    trigger_success(race.to_json)
  end


end