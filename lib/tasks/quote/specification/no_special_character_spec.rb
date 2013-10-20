require_relative 'spec_ification'

class NoSpecialCharacterSpec
  include Spec::Ification

  def is_satisfied_by?(subject)
    /^\w*|\s$/.match(subject)
  end

end