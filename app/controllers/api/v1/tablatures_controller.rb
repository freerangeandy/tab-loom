class Api::V1::TablaturesController < ApplicationController
  before_action :authorize_user

  def index
    render json: Tablatures.all
  end

  def show
    if Tablature.exists?(params[:id])
      tab = Tablature.find(params[:id])
      render json: {
        tablature: serialized_data(tab, TablatureSerializer),
        current_user: current_user
      }
    else
      render json: { error: no_id_match_error_msg }
    end
  end

  def create
    tab = Tablature.new(tab_params)

    if tab.save
      render json: tab
    else
      render json: { error: tab.errors.full_messages.to_sentence }
    end
  end

  def update
    if Tablature.exists?(params[:id])
      tab = Tablature.find(params[:id])
      tab.update_attributes(tab_params)

      if tab.save
        render json: tab
      else
        render json: { error: tab.errors.full_messages.to_sentence }
      end
    else
      render json: { error: no_id_match_error_msg }
    end
  end

  def destroy
    if Tablature.exists?(params[:id])
      tab_by_current_user = current_user.tablatures.exists?(params[:id])
      if tab_by_current_user
        tab = Tablature.find(params[:id])
        user = tab.user
        tab.delete
        render json: user.tablatures
      else
        render json: { error: invalid_id_error_msg }
      end
    else
      render json: { error: no_id_match_error_msg }
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

  def no_id_match_error_msg
    return "ID doesn't match an existing Tablature record"
  end

  def invalid_id_error_msg
    return "ID doesn't match a Tablature belonging to the current user"
  end
end
