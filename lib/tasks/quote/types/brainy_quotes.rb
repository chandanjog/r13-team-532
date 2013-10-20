require 'rubygems'
require 'mechanize'
require_relative '../quotes'

class BrainyQuotes
  include Quotes::Fetch

  def initialize
    @url = 'http://www.brainyquote.com/'
  end

  def crawl
    Mechanize.new.get(@url) do |page|
      page.search('#allTopics .bqLn a').map { |a| a['href'] }.each do |href|
        fetch!([@url, href].join)
      end
    end
  end

  def fetch(link)
    self.run(link, ".bqQuoteLink a")
  end

  def fetch!(link)
    self.run!(link, ".bqQuoteLink a")
  end
end