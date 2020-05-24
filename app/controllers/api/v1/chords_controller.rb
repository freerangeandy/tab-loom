require 'faraday'

class Api::V1::ChordsController < ApplicationController
  include ChordsHelper
  
  protect_from_forgery unless: -> { request.format.json? }

  def index
    url = "https://api.uberchord.com/v1/chords?names=#{api_params}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)
    reformatted_response = reformat_chord_data(parsed_response)

    render json: reformatted_response
  end

  private

  def api_params
    "C,C_m,C_7,C_m7,C_maj7,C_sus2,C_sus4,C_dim,Db,Db_m,Db_7,Db_m7,Db_maj7,Db_sus2,Db_sus4,Db_dim,D,D_m,D_7,D_m7,D_maj7,D_sus2,D_sus4,D_dim,Eb,Eb_m,Eb_7,Eb_m7,Eb_maj7,Eb_sus2,Eb_sus4,Eb_dim,E,E_m,E_7,E_m7,E_maj7,E_sus2,E_sus4,E_dim,F,F_m,F_7,F_m7,F_maj7,F_sus2,F_sus4,F_dim,Gb,Gb_m,Gb_7,Gb_m7,Gb_maj7,Gb_sus2,Gb_sus4,Gb_dim,G,G_m,G_7,G_m7,G_maj7,G_sus2,G_sus4,G_dim,Ab,Ab_m,Ab_7,Ab_m7,Ab_maj7,Ab_sus2,Ab_sus4,Ab_dim,A,A_m,A_7,A_m7,A_maj7,A_sus2,A_sus4,A_dim,Bb,Bb_m,Bb_7,Bb_m7,Bb_maj7,Bb_sus2,Bb_sus4,Bb_dim,B,B_m,B_7,B_m7,B_maj7,B_sus2,B_sus4,B_dim"
  end
end
