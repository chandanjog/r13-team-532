require 'spec_helper'

describe 'Race' do

  it 'should create a race with in-progress status' do
    race = Race.new
    race.status.should == Race::AWAITING_PLAYERS
    race.quote.should_not be_nil
    race.quote.class.should == ''.class
  end

end