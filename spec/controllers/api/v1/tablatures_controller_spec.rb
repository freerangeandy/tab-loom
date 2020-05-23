require "rails_helper"

RSpec.describe Api::V1::TablaturesController, type: :controller do
  before(:example) do
    @user = create(:user_with_tabs, username: "current")
    sign_in @user
  end

  describe "GET#show" do
    before(:example) { @first_tab = @user.tablatures.first }

    it "returns a successful response status and a content type of JSON" do
      get :show, params: {id: @first_tab.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    end

    it "returns a JSON with 'tablature' and 'current_user' keys" do
      get :show, params: {id: @first_tab.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to have_key("tablature")
      expect(returned_json).to have_key("current_user")
    end

    it "returns the specific tablature" do
      get :show, params: {id: @first_tab.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json["tablature"]).to be_kind_of(Hash)
      expect(returned_json["tablature"]["id"]).to eq(@first_tab.id)
      expect(returned_json["tablature"]["title"]).to eq(@first_tab.title)
      expect(returned_json["tablature"]["content"]).to eq(@first_tab.content)
      expect(returned_json["tablature"]["user_id"]).to eq(@user.id)
      expect(returned_json["tablature"]["user_name"]).to eq(@user.username)
    end

    it "returns the current user" do
      get :show, params: {id: @first_tab.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json["current_user"]).to be_kind_of(Hash)
      expect(returned_json["current_user"]["id"]).to eq(@user.id)
      expect(returned_json["current_user"]["username"]).to eq(@user.username)
      expect(returned_json["current_user"]["email"]).to eq(@user.email)
    end
  end

  xdescribe "POST#create" do


  end

  xdescribe "PATCH#update" do


  end

  xdescribe "DELETE#destroy" do

  end
end
