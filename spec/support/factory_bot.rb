require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:username) {|n| "user#{n}" }
    sequence(:email) {|n| "user#{n}@example.com" }
    password {|n| "pass#{n}word" }
    password_confirmation {|n| "pass#{n}word" }
  end

end
