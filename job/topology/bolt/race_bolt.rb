class RaceBolt < RedStorm::DSL::Bolt
  on_init do
    @count = 0
  end
  on_receive :emit => false do |tuple|
    #race = tuple[0]
    #race.update_attribute(:status, "finish")
  end
end