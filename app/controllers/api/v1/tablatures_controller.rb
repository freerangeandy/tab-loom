class Api::V1::TablaturesController < ApplicationController
  before_action :authorize_user

  def index
    render json: Tablatures.all
  end

  def show
    tab = Tablature.find(params[:id])
    render json: {
      tablature: serialized_data(tab, TablatureSerializer),
      current_user: current_user
    }
  end

  def create
    tab = Tablature.new(tab_params)

    if tab.save
      render json: tab
    else
      render json: {error: tab.errors.full_messages.to_sentence}
    end
  end

  def update
    tab = Tablature.find(params[:id])
    tab.update_attributes(tab_params)

    if tab.save
      render json: tab
    else
      render json: {error: tab.errors.full_messages.to_sentence}
    end
  end

  def destroy
    tab_by_current_user = current_user.tablatures.exists?(params[:id])
    if tab_by_current_user
      tab = Tablature.find(params[:id])
      user = tab.user
      tab.delete
      render json: user.tablatures
    end
  end

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, serializer: serializer)
  end

  protected

  def tab_params
    params.require(:tablature).permit(:title, :content, :user_id)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
