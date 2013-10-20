require 'red_storm'
require 'mongoid'
require 'mongoid-scroll'
require 'thread'

require_relative '../../../app/models/race'

class RaceSpout < RedStorm::DSL::Spout
  output_fields :race

  on_init do
    Mongoid.load!('config/mongoid.yml', :production)
    @q = Queue.new
    @mongo_reader = mongo_reader
  end

  on_send do
    @q.pop if @q.size > 0
  end

  private
  def mongo_reader
    Thread.new do
      Thread.current.abort_on_exception = true
      next_cursor = nil
      while true
        current_cursor = next_cursor
        next_cursor = nil
        Race.where(status: 'active').scroll(current_cursor) do |item, cursor|
          next_cursor = cursor
          @q << item
        end
      end
    end
  end
end