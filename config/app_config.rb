require 'configatron'

configatron.TIME_TO_WAIT_FOR_PLAYERS_IN_SECONDS = 50
configatron.MAX_TIME_FOR_RACE = 30

if(Rails.env == 'test')
  configatron.TIME_TO_WAIT_FOR_PLAYERS_IN_SECONDS = 1
end

