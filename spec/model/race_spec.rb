require 'spec_helper'

describe 'Race' do

  it 'should create a race with in-progress status' do
    race = Race.new
    race.status.should == Race::AWAITING_PLAYERS
    race.quote.should_not be_nil
    race.quote.class.should == ''.class
  end

  it 'should return true if a race is available to join' do
    race = Race.create
    race.available_to_join?.should be_false
    sleep(configatron.TIME_TO_WAIT_FOR_PLAYERS_IN_SECONDS)
    race.available_to_join?.should be_true
  end

  it 'should add a player with 0 progress' do
    race = Race.create
    race.players.should be_nil
    race.guest_counter.should == 0

    race.add_player
    race.players['guest_1'].should == {'progress' => 0}
    race.guest_counter.should == 1
  end


end