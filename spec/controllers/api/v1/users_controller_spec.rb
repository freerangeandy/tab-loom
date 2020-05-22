require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET#show" do
    let(:user){ create(:user) }
    before(:example) { allow(controller).to receive(:current_user) { user } }

    it "returns a successful response status and a content type of JSON" do
      get :show, params: {id: -1}

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    end

    it "returns the current user" do
      get :show, params: {id: -1}
      returned_json = JSON.parse(response.body)

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["username"]).to eq(user["username"])
      expect(returned_json["email"]).to eq(user["email"])
      expect(returned_json["tablatures"]).to be_kind_of(Array)
    end
  end
end
