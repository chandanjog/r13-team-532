# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

TouchTypeIn::Application.load_tasks

namespace :spec do
  desc "Run all tests"
  task :all => [:js, :ruby]

  desc "Run javascript tests"
  task :js do
    sh './node_modules/.bin/mocha-phantomjs -R tap public/tests.html'
  end

  desc "Run ruby tests"
  task :ruby => :test
end

namespace :dump do

  desc "Sets the environment"
  task :environment do
    Mongoid.load!('config/mongoid.yml', :production)
  end

  desc "Dump quotes from branyquotes"
  task :brainyquotes => :environment do
    BrainyQuotes.new.crawl
  end
end

