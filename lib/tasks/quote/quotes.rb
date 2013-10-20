require 'mechanize'
require 'mongoid'

require_relative 'specification/specs'

module Quotes
  module Fetch
    def spec
      BigEnoughSpec.new(100)
      .and(NotThatBigSpec.new(1000))
      .and(NoSpecialCharacterSpec.new);
    end

    def run(doc, selector)
      Mechanize.new.get(doc).search(selector).map(&:text).map(&:strip).select(&spec.predicate)
    end

    def run!(doc, selector)
      run(doc, selector).each do |sentence|
        Quote.create!(sentence: sentence)
      end
    end
  end

  class Quote
    include Mongoid::Document
    field :sentence, type: String
  end
end