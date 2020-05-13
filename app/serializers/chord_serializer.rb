class ChordSerializer < ActiveModel::Serializer
  attributes :id, :name, :root, :quality, :tension, :strings
end
