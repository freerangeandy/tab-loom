require 'faraday'

class Api::V1::ChordsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def stringify_params
    root_param = "#{params[:root]}"
    if (!params[:quality].strip.empty? || !params[:tension].strip.empty?)
      return "#{root_param}_#{params[:tension]}#{params[:quality]}"
    else
      return root_param
    end
  end

  def show
    api_params = params[:id]
    url = "https://api.uberchord.com/v1/chords/#{api_params}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)

    render json: parsed_response[0]
  end
end
