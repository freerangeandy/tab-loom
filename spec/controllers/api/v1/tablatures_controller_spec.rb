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
      get :show, params: { id: @first_tab.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    end

    it "returns a JSON with 'tablature' and 'current_user' keys" do
      get :show, params: { id: @first_tab.id }
      returned_json = JSON.parse(response.body)

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to have_key("tablature")
      expect(returned_json).to have_key("current_user")
    end

    it "returns the specific tablature" do
      get :show, params: { id: @first_tab.id }
      returned_json = JSON.parse(response.body)

      expect(returned_json["tablature"]).to be_kind_of(Hash)
      expect(returned_json["tablature"]["id"]).to eq(@first_tab.id)
      expect(returned_json["tablature"]["title"]).to eq(@first_tab.title)
      expect(returned_json["tablature"]["content"]).to eq(@first_tab.content)
      expect(returned_json["tablature"]["user_id"]).to eq(@user.id)
      expect(returned_json["tablature"]["user_name"]).to eq(@user.username)
    end

    it "returns the current user" do
      get :show, params: { id: @first_tab.id }
      returned_json = JSON.parse(response.body)

      expect(returned_json["current_user"]).to be_kind_of(Hash)
      expect(returned_json["current_user"]["id"]).to eq(@user.id)
      expect(returned_json["current_user"]["username"]).to eq(@user.username)
      expect(returned_json["current_user"]["email"]).to eq(@user.email)
    end

    it "returns an error if tablature id doesn't match a tablature" do
      get :show, params: { id: 0 }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["error"]).to eq "ID doesn't match an existing Tablature record"
    end
  end

  describe "POST#create" do
    before(:each) do
      @post_json = {
        tablature: {
          title: "Sample Tab",
          content: "--41--42",
          user_id: @user.id
        }
      }
    end

    it "posts a new tablature upon successful request" do
      post :create, params: @post_json

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(Tablature.count).to eq(@prev_count + 1)
    end

    it "returns the JSON of the newly created tablature" do
      post :create, params: @post_json

      returned_json = JSON.parse(response.body)

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["title"]).to eq(@post_json[:tablature][:title])
      expect(returned_json["content"]).to eq(@post_json[:tablature][:content])
      expect(returned_json["user_id"]).to eq(@user.id)
      expect(returned_json["user_name"]).to eq(@user.username)
    end

    it "returns errors if title field missing" do
      tab_title_missing = { **@post_json[:tablature], title: ""}
      title_missing_json = { tablature: tab_title_missing }

      post :create, params: title_missing_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Title can't be blank"
      expect(Tablature.count).to eq(@prev_count)
    end

    it "returns errors if content field missing" do
      tab_content_missing = { **@post_json[:tablature], content: ""}
      content_missing_json = { tablature: tab_content_missing }

      post :create, params: content_missing_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Content can't be blank"
      expect(Tablature.count).to eq(@prev_count)
    end

    it "returns errors if user id missing" do
      tab_user_missing = { **@post_json[:tablature], user_id: ""}
      user_missing_json = { tablature: tab_user_missing }

      post :create, params: user_missing_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "User must exist and User can't be blank"
      expect(Tablature.count).to eq(@prev_count)
    end

    it "returns errors if user id doesn't match a user" do
      tab_user_wrong = { **@post_json[:tablature], user_id: 0}
      user_wrong_json = { tablature: tab_user_wrong }

      post :create, params: user_wrong_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "User must exist and User can't be blank"
      expect(Tablature.count).to eq(@prev_count)
    end
  end

  describe "PATCH#update" do
    before(:each) do
      @patch_json = {
        id: @first_tab.id,
        tablature: {
          title: "Sample Tab",
          content: "--41--42",
          user_id: @user.id
        }
      }
    end

    it "returns a successful response status and a content type of JSON" do
      patch :update, params: @patch_json

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(Tablature.count).to eq(@prev_count)
    end

    it "returns the JSON of the updated tablature" do
      patch :update, params: @patch_json

      returned_json = JSON.parse(response.body)
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["id"]).to eq(@patch_json[:id])
      expect(returned_json["title"]).to eq(@patch_json[:tablature][:title])
      expect(returned_json["content"]).to eq(@patch_json[:tablature][:content])
      expect(returned_json["user_id"]).to eq(@user.id)
      expect(returned_json["user_name"]).to eq(@user.username)
    end

    it "returns errors if title field missing" do
      tab_missing_title = { **@patch_json[:tablature], title: ""}
      missing_title_json = { **@patch_json, tablature: tab_missing_title}

      patch :update, params: missing_title_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Title can't be blank"
    end

    it "returns errors if content field missing" do
      tab_missing_content = { **@patch_json[:tablature], content: ""}
      missing_content_json = { **@patch_json, tablature: tab_missing_content}

      patch :update, params: missing_content_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Content can't be blank"
    end

    it "returns errors if user id doesn't match a user" do
      tab_user_wrong = { **@patch_json[:tablature], user_id: 0}
      user_wrong_json = { **@patch_json, tablature: tab_user_wrong}

      patch :update, params: user_wrong_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "User must exist and User can't be blank"
    end

    it "returns an error if tablature id doesn't match a tablature" do
      tab_wrong_json = { **@patch_json, id: 0 }

      patch :update, params: tab_wrong_json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "ID doesn't match an existing Tablature record"
    end
  end

  describe "DELETE#destroy" do
    it "deletes tablature upon successful request" do
      delete :destroy, params: { id: @first_tab.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(Tablature.count).to eq(@prev_count - 1)
    end

    it "returns array of user's remaining tablatures" do
      delete :destroy, params: { id: @first_tab.id }

      returned_json = JSON.parse(response.body)
      expect(returned_json).to be_kind_of(Array)
      expect(returned_json.first).to be_kind_of(Hash)
      expect(returned_json.last).to be_kind_of(Hash)
      expect(returned_json.length).to eq(@user.tablatures.length)
    end

    it "returns an error if tablature id doesn't match a tablature" do
      delete :destroy, params: { id: 0 }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "ID doesn't match an existing Tablature record"
      expect(Tablature.count).to eq(@prev_count)
    end

    it "returns an error if tablature id doesn't match a tablature belonging to current user" do
      other_user = create(:user, username: "not current")
      other_tab = create(:tablature, user: other_user)
      new_previous_count = @prev_count + 1

      delete :destroy, params: { id: other_tab.id }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "ID doesn't match a Tablature belonging to the current user"
      expect(Tablature.count).to eq(new_previous_count)
    end
  end
end
