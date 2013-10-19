require File.expand_path('../boot', __FILE__)

require "action_controller/railtie"
require "sprockets/railtie"
require "rails/test_unit/railtie"
require_relative 'background_job'

Bundler.require(:default, Rails.env)

module TouchTypeIn
  class Application < Rails::Application
    config.assets.enabled = true
    
    config.assets.version = '1.0'

    # config.assets.precompile +=  %w( )
  end

  Thread.new do
    ContinuousPost.new.start
  end

  #WebsocketRails[:race_1].trigger 'update', "Yayy"

end
