require_relative 'spec_ification'

class NotThatBigSpec
  include Spec::Ification

  def initialize(maximum)
    @maximum = maximum
  end

  def is_satisfied_by?(subject)
    subject.length < @maximum
  end

end