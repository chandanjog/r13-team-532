require File.expand_path('../boot', __FILE__)

require "action_controller/railtie"
require "sprockets/railtie"
require "rails/test_unit/railtie"

Bundler.require(:default, Rails.env)

module TouchTypeIn
  class Application < Rails::Application
    config.assets.enabled = true

    config.assets.version = '1.0'

    config.assets.initialize_on_precompile = true

    # Don't fallback to assets pipeline if a precompiled asset is missed
    config.assets.compile = true

    # Generate digests for assets URLs.
    config.assets.digest = true

    require_relative "app_config"
  end
end
