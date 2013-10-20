require_relative 'spec_ification'

class BigEnoughSpec
  include Spec::Ification

  def initialize(minimum)
    @minimum = minimum
  end

  def is_satisfied_by?(subject)
    subject.length > @minimum
  end

end