export JRUBY_OPTS=--1.9
bundle install
bundle exec redstorm install
bundle exec redstorm bundle topology
bundle exec redstorm local .topology/touch_type_in_topology.rb