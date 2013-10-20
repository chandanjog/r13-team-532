class RaceController < WebsocketRails::BaseController

  def get
    races_awaiting_players = Race.where(:await_players_till.gt => Time.now.utc)
    race = races_awaiting_players.empty? ? Race.new : races_awaiting_players.first
    race.add_player
    race.save! ? trigger_success(race.to_json) : trigger_failure
  end

  def update
    race_id = message['race_id']

    race = Race.find(race_id);
    trigger_failure if race.nil?
    race.players[message['player_id']] = { :progress => message['progress'] }

    if race.save!
      puts 'in save'
      WebsocketRails[race_id].trigger('updates', race)
      trigger_success race
    else
      puts 'in error'
      trigger_failure race
    end

  end

end