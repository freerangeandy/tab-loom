require 'faraday'

class Api::V1::ChordsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    api_params = params[:id]
    url = "https://api.uberchord.com/v1/chords?names=#{api_params}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)
    reformatted_response = reformat_chord_data(parsed_response)

    render json: reformatted_response
  end

  private

  def reformat_chord_name(chord_name)
    chord_name_split = chord_name.split(',')
    if !chord_name.include?(",,,")
      return "#{chord_name_split[0]}_#{chord_name_split[1..3].join('')}"
    else
      return chord_name_split[0]
    end
  end

  def reformat_chord_data(chord_list)
    return reformatted_list = chord_list.map do |chord_obj|
      chord_strings = chord_obj["strings"].split(" ")
      chord_name = reformat_chord_name(chord_obj["chordName"])
      { strings: chord_strings, name: chord_name }
    end
  end
end
