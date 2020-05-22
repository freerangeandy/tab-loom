require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:complete_user) { User.new(username: "complete", password: "2complete4u", password_confirmation: "2complete4u", email: "this@isntreal.com") }

  describe ".new" do
    it "should return a User object" do
      new_user = build(:user)
      expect(new_user).to be_a(User)
    end
  end

  describe ".valid?" do
    it "should return true if all fields entered" do
      expect(complete_user.valid?).to be(true)
    end

    it "should return false if any fields missing" do
      no_username = build(:user, username: "")
      no_email = build(:user, email: "")
      no_passwords = build(:user, password: "", password_confirmation: "")

      expect(no_username.valid?).to be(false)
      expect(no_email.valid?).to be(false)
      expect(no_passwords.valid?).to be(false)
    end
  end
end
