class Race
  AWAITING_PLAYERS = 'awaiting_players'
  ACTIVE = 'active'

  include Mongoid::Document
  field :status, type: String, default: AWAITING_PLAYERS
  field :quote, type: String, default: ->{ quote }
  field :players, type: Hash
  field :created_at, type: Time, default: ->{Time.now}
  field :await_players_till, type: Time, default: ->{ Time.now + configatron.TIME_TO_WAIT_FOR_PLAYERS_IN_SECONDS }
  field :guest_counter, type: Integer, default: 0

  def quote
    [
        'Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.',
        'Always be yourself, express yourself, have faith in yourself, do not go out and look for a successful personality and duplicate it.',
        'We need to find God, and he cannot be found in noise and restlessness. God is the friend of silence. See how nature - trees, flowers, grass- grows in silence; see the stars, the moon and the sun, how they move in silence... We need silence to be able to touch souls.',
        'There is no end to education. It is not that you read a book, pass an examination, and finish with education. The whole of life, from the moment you are born to the moment you die, is a process of learning.',
        'The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.'
    ].sample
  end

  def available_to_join?
    (await_players_till - Time.now) < 0
  end

  def add_player
    self.players = {} if self.players.nil?
    self.guest_counter += 1
    self.players["guest_#{self.guest_counter}"] = {'progress' => 0}
  end

end