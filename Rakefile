# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

TouchTypeIn::Application.load_tasks

namespace :spec do
  desc "Test the Javascript using mocha-phantomjs"
  task :js do
    sh 'mocha-phantomjs -R tap public/tests.html'
  end
end