ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'websocket_rails/spec_helpers'
require 'rspec/rails'
require 'rspec/autorun'

# ActiveRecord::Migration.check_pending! if defined?(ActiveRecord::Migration)

RSpec.configure do |config|

  config.before do
    DatabaseCleaner.clean
  end
  config.infer_base_class_for_anonymous_controllers = false
  config.order = "random"
end
