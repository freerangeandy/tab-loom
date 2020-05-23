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

  describe "POST#create" do
    before(:example) { @prev_count = Tablature.count }
    it "posts a new tablature upon successful request" do
      post_json = {
        tablature: {
          title: "Sample Tab",
          content: "--41--42",
          user_id: @user.id
        }
      }
      post :create, params: post_json

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(Tablature.count).to eq(@prev_count + 1)
    end

    it "returns the JSON of the newly created tablature" do
      post_json = {
        tablature: {
          title: "Sample Tab",
          content: "--41--42",
          user_id: @user.id
        }
      }
      post :create, params: post_json

      returned_json = JSON.parse(response.body)

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["title"]).to eq(post_json[:tablature][:title])
      expect(returned_json["content"]).to eq(post_json[:tablature][:content])
      expect(returned_json["user_id"]).to eq(@user.id)
      expect(returned_json["user_name"]).to eq(@user.username)
    end

    it "returns errors if title field missing" do
      title_missing_json = {
        tablature: {
          title: "",
          content: "--41--42",
          user_id: @user.id
        }
      }
      post :create, params: title_missing_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Title can't be blank"
      expect(Tablature.count).to eq(@prev_count)
    end

    it "returns errors if content field missing" do
      content_missing_json = {
        tablature: {
          title: "No content",
          content: "",
          user_id: @user.id
        }
      }
      post :create, params: content_missing_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Content can't be blank"
      expect(Tablature.count).to eq(@prev_count)
    end

    it "returns errors if user id missing" do
      user_missing_json = {
        tablature: {
          title: "No user",
          content: "--41--42",
          user_id: ""
        }
      }

      post :create, params: user_missing_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "User must exist and User can't be blank"
      expect(Tablature.count).to eq(@prev_count)
    end

    it "returns errors if user id doesn't match a user" do
      user_wrong_json = {
        tablature: {
          title: "Not a user",
          content: "--41--42",
          user_id: -1
        }
      }

      post :create, params: user_wrong_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "User must exist and User can't be blank"
      expect(Tablature.count).to eq(@prev_count)
    end
  end

  xdescribe "PATCH#update" do


  end

  xdescribe "DELETE#destroy" do

  end
end
