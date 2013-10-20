require_relative '../../app/models/race'

class RaceProcessor

  def self.start
    while(true)
      #puts 'processing races..'
      races = Race.where(:status => Race::AWAITING_PLAYERS)
      races.each do |race|
        if race.ready_to_start?
          race.status = Race::ACTIVE
          race.save
          WebsocketRails[race.id.to_s].trigger('start', race)
        elsif race.has_finished?
          race.status = Race::COMPLETE
          race.save
        end

      end
    end
  end

end

#t = Thread.new do
#  RaceProcessor.start
#end

pid = fork do
  RaceProcessor.start
end

Process.detach(pid)