class Tablature < ApplicationRecord
  belongs_to :user

  validates :title, :e_1, :b_2, :g_3, :d_4, :a_5, :e_6, :user, presence: true
end
