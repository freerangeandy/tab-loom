class ChordSerializer < ActiveModel::Serializer
  attributes :id, :name, :root, :variant, :strings

end
