class Race
  AWAITING_PLAYERS = 'awaiting_players'
  ACTIVE = 'active'
  COMPLETE = 'complete'

  include Mongoid::Document
  field :status, type: String, default: AWAITING_PLAYERS
  field :quote, type: String, default: -> { quote }
  field :players, type: Hash, default: -> { Hash.new }
  field :created_at, type: Time, default: -> { Time.now }
  field :await_players_till, type: Time, default: -> { Time.now.utc + configatron.TIME_TO_WAIT_FOR_PLAYERS_IN_SECONDS }
  field :guest_counter, type: Integer, default: 0
  index({:status => 1})

  before_update :add_or_update_bot_player_progress

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
    (self.await_players_till - Time.now.utc) < 0
  end

  def add_player
    self.guest_counter += 1
    self.players["guest_#{self.guest_counter}"] = {'progress' => 0}
  end

  def ready_to_start?
    !available_to_join? && self.players.count >=2
  end

  def add_or_update_bot_player_progress
    if self.players['bot'].nil?
      self.players['bot'] = {'progress' => 0}
    else
      previous = self.players['bot']['progress']
      self.players['bot'] = {'progress' => previous + 10}
    end
  end

  def has_finished?
    all_players_have_finished? || race_time_up?
  end

  def race_time_up?
    (Time.now.utc - self.created_at) > configatron.MAX_TIME_FOR_RACE
  end

  def all_players_have_finished?
    all_finished = true
    self.players.each do |id, value|
      player_finished = (value['progress'] <= 100)
      return false unless player_finished
      all_finished = all_finished && player_finished
    end
    all_finished
  end

end
