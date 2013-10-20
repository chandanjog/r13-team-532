require 'red_storm'
require_relative 'spout/spouts'
require_relative 'bolt/bolts'

class TouchTypeInTopology < RedStorm::DSL::Topology
  spout RaceSpout do
    output_fields :race
  end

  bolt RaceBolt do
    source RaceSpout, :global
  end

  configure do
    debug false
    max_task_parallelism 4
    num_workers 1
    max_spout_pending 1000
  end
end