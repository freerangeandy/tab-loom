require "rails_helper"

RSpec.describe Api::V1::ChordsController, type: :controller do
  let!(:base_url) { "https://api.uberchord.com/v1/chords" }
  let!(:major_chord_param) { "Gb" }
  let!(:variant_chord_param) { "F_m7" }
  let!(:all_chord_params) {
    "C,C_m,C_7,C_m7,C_maj7,C_sus2,C_sus4,C_dim,Db,Db_m,Db_7,Db_m7,Db_maj7,Db_sus2,Db_sus4,Db_dim,D,D_m,D_7,D_m7,D_maj7,D_sus2,D_sus4,D_dim,Eb,Eb_m,Eb_7,Eb_m7,Eb_maj7,Eb_sus2,Eb_sus4,Eb_dim,E,E_m,E_7,E_m7,E_maj7,E_sus2,E_sus4,E_dim,F,F_m,F_7,F_m7,F_maj7,F_sus2,F_sus4,F_dim,Gb,Gb_m,Gb_7,Gb_m7,Gb_maj7,Gb_sus2,Gb_sus4,Gb_dim,G,G_m,G_7,G_m7,G_maj7,G_sus2,G_sus4,G_dim,Ab,Ab_m,Ab_7,Ab_m7,Ab_maj7,Ab_sus2,Ab_sus4,Ab_dim,A,A_m,A_7,A_m7,A_maj7,A_sus2,A_sus4,A_dim,Bb,Bb_m,Bb_7,Bb_m7,Bb_maj7,Bb_sus2,Bb_sus4,Bb_dim,B,B_m,B_7,B_m7,B_maj7,B_sus2,B_sus4,B_dim"
  }

  describe "GET#index" do
    it "returns JSON for the Gb major chord" do
      expected_response = {
          strings: "2 4 4 3 2 2",
          fingering: "1 3 4 2 1 1",
          chordName: "Gb,,,",
          enharmonicChordName: "F#,,,",
          voicingID: "9223372036924084354",
          tones: "Gb,Bb,Db"
      }
      VCR.use_cassette "chords/major", :record => :new_episodes  do
        url = "#{base_url}/#{major_chord_param}"
        api_response = Faraday.get(url)
        parsed_response = JSON.parse(api_response.body)

        expect(parsed_response.count).to eq(1)
        expect(parsed_response[0]["strings"]).to eq(expected_response[:strings])
        expect(parsed_response[0]["fingering"]).to eq(expected_response[:fingering])
        expect(parsed_response[0]["chordName"]).to eq(expected_response[:chordName])
        expect(parsed_response[0]["enharmonicChordName"]).to eq(expected_response[:enharmonicChordName])
        expect(parsed_response[0]["voicingID"]).to eq(expected_response[:voicingID])
        expect(parsed_response[0]["tones"]).to eq(expected_response[:tones])
      end
    end

    it "returns JSON for the F minor 7th chord" do
      expected_response = {
          strings: "1 3 1 1 1 1",
          fingering: "1 3 1 1 1 1",
          chordName: "F,m,7,",
          enharmonicChordName: "F,m,7,",
          voicingID: "9223372036889412705",
          tones: "F,Ab,C,Eb"
      }
      VCR.use_cassette "chords/variant", :record => :new_episodes do
        url = "#{base_url}/#{variant_chord_param}"
        api_response = Faraday.get(url)
        parsed_response = JSON.parse(api_response.body)

        expect(parsed_response.count).to eq(1)
        expect(parsed_response[0]["strings"]).to eq(expected_response[:strings])
        expect(parsed_response[0]["fingering"]).to eq(expected_response[:fingering])
        expect(parsed_response[0]["chordName"]).to eq(expected_response[:chordName])
        expect(parsed_response[0]["enharmonicChordName"]).to eq(expected_response[:enharmonicChordName])
        expect(parsed_response[0]["voicingID"]).to eq(expected_response[:voicingID])
        expect(parsed_response[0]["tones"]).to eq(expected_response[:tones])
      end
    end

    it "returns JSON for 96 chords (12 roots * 8 variants)" do
      expected_first_chord_name = "C,,,"
      expected_last_chord_name = "B,dim,,"

      VCR.use_cassette "chords/all_96", :record => :new_episodes do
        url = "#{base_url}?names=#{all_chord_params}"
        api_response = Faraday.get(url)
        parsed_response = JSON.parse(api_response.body)

        expect(parsed_response.count).to eq(96)
        expect(parsed_response.first["chordName"]).to eq(expected_first_chord_name)
        expect(parsed_response.last["chordName"]).to eq(expected_last_chord_name)
      end
    end
  end
end
