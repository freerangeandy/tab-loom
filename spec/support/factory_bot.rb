require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:username) {|n| "user#{n}" }
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:password) {|n| "pass#{n}word" }
    sequence(:password_confirmation) {|n| "pass#{n}word" }
  end

  factory :user_with_tabs, parent: :user do
    after :create do |user_with_tabs|
      create_list :tablature, 3, user: user_with_tabs
    end
  end

  factory :tablature do
    sequence(:title) {|n| "Tab #{n}"}
    sequence(:content) { |n| "-#{n}-" }
    user
  end
end
