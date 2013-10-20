class RaceController < WebsocketRails::BaseController

  def get
    races_awaiting_players = Race.where(:await_players_till.gt => Time.now.utc)
    race = races_awaiting_players.empty? ? Race.new : races_awaiting_players.first
    race.add_player
    race.save
    trigger_success(race.to_json)
  end

  def update
    race_id = message['race_id']

    race = Race.find(race_id);
    trigger_failure if race.nil?

    race.players[message['player_id']] = { :progress => message['progress'] }
    race.save

    WebsocketRails[race_id].trigger('updates', race)
    trigger_success
  end

end