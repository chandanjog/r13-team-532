class ContinuousPost

  def start
    i=0;
    while(true)
      WebsocketRails[:race_1].trigger 'update', i
      puts "------------#{i}"
      i=i+1;
    end
  end

end