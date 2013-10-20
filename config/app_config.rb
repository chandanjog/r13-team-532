require 'configatron'

configatron.TIME_TO_WAIT_FOR_PLAYERS_IN_SECONDS = 10

if(Rails.env == 'test')
  configatron.TIME_TO_WAIT_FOR_PLAYERS_IN_SECONDS = 1
end

