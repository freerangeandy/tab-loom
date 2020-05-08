class Api::V1::UsersController < ApplicationController
  def show
    render json: current_user
  end
end
