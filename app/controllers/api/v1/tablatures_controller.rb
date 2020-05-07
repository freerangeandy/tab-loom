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

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, serializer: serializer)
  end

  protected

  def tab_params
    params.require(:tablature).permit(:title, :content, :user_id, :user_name)
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
