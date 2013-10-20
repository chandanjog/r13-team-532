class RaceController < WebsocketRails::BaseController

  def get
    puts request.session_options[:id]
    race_awaiting_players = Race.where(:status => Race::AWAITING_PLAYERS)
    race = race_awaiting_players.empty? ? Race.new.to_json : race_awaiting_players.first.to_json
    race.players << {request.session_options[:id] => {:progress => 0}}
    trigger_success(race)
  end


end