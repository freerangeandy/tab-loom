class Chord < ApplicationRecord
  validates :name, :root, :strings, presence: true
  validates :name, uniqueness: true
end
