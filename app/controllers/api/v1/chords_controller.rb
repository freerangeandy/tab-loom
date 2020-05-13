require 'faraday'

class Api::V1::ChordsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    api_params = params[:id]
    url = "https://api.uberchord.com/v1/chords?names=#{api_params}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)

    render json: parsed_response
  end
end
