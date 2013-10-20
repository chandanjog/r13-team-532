module Spec
  module Ification
    def and(spec)
      Generic::And.new([self, spec])
    end

    def or(spec)
      Generic::Or.new([self, spec])
    end

    def not()
      Generic::Not.new([self])
    end

    def predicate
      lambda { |subject| self.is_satisfied_by? subject }
    end
  end

  module Generic
    class And
      include Spec::Ification
      def initialize(specs)
        @specifications = specs
      end

      def is_satisfied_by?(subject)
        @specifications.all? do |spec|
          spec.is_satisfied_by?(subject)
        end
      end
    end

    class Or
      include Spec::Ification
      def initialize(specs)
        @specifications = specs
      end

      def is_satisfied_by?(subject)
        @specifications.any? do |spec|
          spec.is_satisfied_by?(subject)
        end
      end
    end

    class Not
      include Spec::Ification
      def initialize(spec)
        @spec = spec
      end

      def is_satisfied_by?(subject)
        !@spec.is_satisfied_by?(subject)
      end
    end
  end
end