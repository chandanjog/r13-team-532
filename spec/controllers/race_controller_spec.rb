require 'spec_helper'

describe 'RaceController' do

  describe 'races.get' do

    it 'should route correctly' do
      create_event('races.get', nil).should be_routed_only_to 'race#get'
    end

    #Some issues with the websocket-rails testing libraray. Not able to trigger the controller action.
    xit 'should return a race awaiting players or create a new one' do
      race_awaiting_players = Race.create

      ongoing_race = Race.create
      ongoing_race.status = Race::ACTIVE
      ongoing_race.save

      event = create_event('races.get', nil)
      event('races.get', nil).dispatch.should trigger_success_message(race_awaiting_players.to_json)
      puts event.triggered
    end

  end


end
