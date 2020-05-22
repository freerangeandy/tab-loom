require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:complete_attributes) { { username: "complete", password: "2complete4u", password_confirmation: "2complete4u", email: "this@isntreal.com" } }
  let!(:existing_attributes) { { username: "existing", password: "1exist33", password_confirmation: "1exist33", email: "exist@isntreal.com" } }
  let!(:different_attributes) { { username: "different", password: "diff4rent", password_confirmation: "diff4rent", email: "diff@isntreal.com" } }
  let!(:new_user) { build(:user) }

  describe ".new" do
    it "should return a User object" do
      expect(new_user).to be_a(User)
    end
  end

  describe ".valid?" do
    it "should return true if all fields entered" do
      expect(new_user.valid?).to be(true)
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

  describe ".create" do
    it "should add a record to the database" do
      prev_count = User.count
      new_user = create(:user, **different_attributes)

      expect(User.count).to eq(prev_count + 1)
    end
  end

  describe ".save" do
    before(:example) do
      existing_user = create(:user, **existing_attributes)
      @prev_count = User.count
    end

    it "should not add a record if username already exists in database" do
      username_duplicate = build(:user, { **existing_attributes, email: "duplicate@isntreal.com" })

      expect(username_duplicate.save).to be(false)
      expect(User.count).to eq(@prev_count)
    end

    it "should not add a record if email already exists in database" do
      email_duplicate = build(:user, { **existing_attributes, username: "duplicate" })

      expect(email_duplicate.save).to be(false)
      expect(User.count).to eq(@prev_count)
    end
  end

  context "instance variables" do
    before(:example) do
      complete_user = create(:user, **complete_attributes)
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
