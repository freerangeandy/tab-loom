class Tablature < ApplicationRecord
  belongs_to :user

  validates :content, :user, presence: true
end
