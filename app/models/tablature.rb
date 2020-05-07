class Tablature < ApplicationRecord
  belongs_to :user

  validates :title, :content, :user, presence: true
end
