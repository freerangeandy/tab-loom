require "rails_helper"

RSpec.describe Api::V1::TablaturesController, type: :controller do
  before(:example) do
    @user = create(:user_with_tabs, username: "current")
    @first_tab = @user.tablatures.first
    @prev_count = Tablature.count
    sign_in @user
  end

  describe "GET#show" do
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
          user_id: 0
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

  describe "PATCH#update" do
    it "returns a successful response status and a content type of JSON" do
      patch_json = {
        id: @first_tab.id,
        tablature: {
          title: "Sample Tab",
          content: "--41--42",
          user_id: @user.id
        }
      }
      patch :update, params: patch_json

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(Tablature.count).to eq(@prev_count)
    end

    it "returns the JSON of the updated tablature" do
      patch_json = {
        id: @first_tab.id,
        tablature: {
          title: "Sample Tab",
          content: "--41--42",
          user_id: @user.id
        }
      }
      patch :update, params: patch_json

      returned_json = JSON.parse(response.body)
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["title"]).to eq(patch_json[:tablature][:title])
      expect(returned_json["content"]).to eq(patch_json[:tablature][:content])
      expect(returned_json["user_id"]).to eq(@user.id)
      expect(returned_json["user_name"]).to eq(@user.username)
    end

    it "returns errors if title field missing" do
      missing_title_json = {
        id: @first_tab.id,
        tablature: {
          title: "",
          content: "--41--42",
          user_id: @user.id
        }
      }
      patch :update, params: missing_title_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Title can't be blank"
    end

    it "returns errors if content field missing" do
      missing_content_json = {
        id: @first_tab.id,
        tablature: {
          title: "Sample Tab",
          content: "",
          user_id: @user.id
        }
      }
      patch :update, params: missing_content_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Content can't be blank"
    end

    it "returns errors if user id missing" do
      user_wrong_json = {
        id: @first_tab.id,
        tablature: {
          title: "Sample Tab",
          content: "--41--42",
          user_id: 0
        }
      }
      patch :update, params: user_wrong_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "User must exist and User can't be blank"
    end
  end

  describe "DELETE#destroy" do
    it "deletes tablature upon successful request" do
      delete :destroy, params: {id: @first_tab.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(Tablature.count).to eq(@prev_count - 1)
    end

    it "returns array of user's remaining tablatures" do
      delete :destroy, params: {id: @first_tab.id}

      returned_json = JSON.parse(response.body)
      expect(returned_json).to be_kind_of(Array)
      expect(returned_json.first).to be_kind_of(Hash)
      expect(returned_json.last).to be_kind_of(Hash)
      expect(returned_json.length).to eq(@user.tablatures.length)
    end
  end
end
