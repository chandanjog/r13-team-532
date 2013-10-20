require 'mina/bundler'
require 'mina/git'

# Basic settings:
set :domain, '173.255.244.61'
set :port, '22'
set :deploy_to, '/var/www/job/touchtype.in'
set :repository, 'https://github.com/railsrumble/r13-team-532.git'
set :branch, 'master'

# Optional settings:
set :user, 'root'

task :environment do
  # For those using RVM, use this to load an RVM version@gemset.
  # invoke :'rvm:use[ruby-1.9.3-p125@default]'
  queue 'export JRUBY_OPTS=--1.9'
  queue 'cd job'
end

task :setup => :environment do
end

task :redstorm => :environment do
  queue 'bundle exec redstorm install'
  queue 'bundle exec redstorm bundle topology'
  queue 'bundle exec redstorm local .topology/touch_type_in_topology.rb'
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'bundle:install'
    invoke :redstorm

    to :launch do
      queue "touch #{deploy_to}/#{current_path}/tmp/restart.txt"
    end
  end
end