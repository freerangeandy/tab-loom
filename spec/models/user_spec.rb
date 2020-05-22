require 'rails_helper'

RSpec.describe User, type: :model do
  describe ".new" do
    it "should return a User object" do
      new_user = build(:user)
      expect(new_user).to be_a(User)
    end
  end

  describe ".valid?" do
    it "should return true if all fields entered" do
      complete_user = build(:user)
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

  context "instance variables" do 
    before(:example) do
      complete_user = User.create(username: "complete", password: "2complete4u", password_confirmation: "2complete4u", email: "this@isntreal.com")
      @complete_user_saved = User.find(complete_user.id)
    end

    describe "#username" do
      it "should return the username" do
        expect(@complete_user_saved.username).to eq("complete")
      end
    end

    describe "#email" do
      it "should return the email address" do
        expect(@complete_user_saved.email).to eq("this@isntreal.com")
      end
    end

    describe "#password" do
      it "should not return the actual password" do
        expect(@complete_user_saved.password).to eq(nil)
      end
    end
  end
end
