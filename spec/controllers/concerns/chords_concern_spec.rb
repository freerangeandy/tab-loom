require "rails_helper"

describe ChordsConcern do
  before do
    class DummyController < ApplicationController
      include ChordsConcern
    end
  end
  after { Object.send :remove_const, :DummyController }
  let(:object) { DummyController.new }
  let!(:c_chords_json) do
    [
      { "strings"=>"X 3 2 0 1 0", "fingering"=>"X 3 2 X 1 X", "chordName"=>"C,,,", "enharmonicChordName"=>"C,,,", "voicingID"=>"9223372036855826559", "tones"=>"C,E,G" },
      { "strings"=>"X 3 5 5 4 3", "fingering"=>"X 1 3 4 2 1", "chordName"=>"C,m,,", "enharmonicChordName"=>"C,m,,", "voicingID"=>"9223372036959802495", "tones"=>"C,Eb,G" },
      { "strings"=>"X 3 2 3 1 0", "fingering"=>"X 3 2 4 1 X", "chordName"=>"C,,7,", "enharmonicChordName"=>"C,,7,", "voicingID"=>"9223372036855924863", "tones"=>"C,E,G,Bb" },
      { "strings"=>"X 3 5 3 4 3", "fingering"=>"X 1 3 1 2 1", "chordName"=>"C,m,7,", "enharmonicChordName"=>"C,m,7,", "voicingID"=>"9223372036959736959", "tones"=>"C,Eb,G,Bb" },
      { "strings"=>"X 3 5 4 5 3", "fingering"=>"X 1 3 2 4 1", "chordName"=>"C,maj,7,", "enharmonicChordName"=>"C,maj,7,", "voicingID"=>"9223372036960818303", "tones"=>"C,E,G,B" },
      { "strings"=>"X 3 0 0 3 3", "fingering"=>"X 1 X X 3 4", "chordName"=>"C,sus2,,", "enharmonicChordName"=>"C,sus2,,", "voicingID"=>"9223372036958584959", "tones"=>"C,D,G" },
      { "strings"=>"X 3 3 0 1 1", "fingering"=>"X 3 4 X 1 1", "chordName"=>"C,sus4,,", "enharmonicChordName"=>"C,sus4,,", "voicingID"=>"9223372036889382015", "tones"=>"C,F,G" },
      { "strings"=>"X 3 4 5 4 X", "fingering"=>"X 1 2 4 3 X", "chordName"=>"C,dim,,", "enharmonicChordName"=>"C,dim,,", "voicingID"=>"9223372037899325567", "tones"=>"C,Eb,Gb" }
    ]
  end

  let!(:c_maj_name) { "C,,," }
  let!(:c_7_name) { "C,,7," }
  let!(:c_sus2_name) { "C,sus2,," }
  let!(:c_maj7_name) { "C,maj,7," }

  describe "#reformat_chord_name" do
    it "should reformat C major chord name" do
      reformatted_chord_name = object.reformat_chord_name(c_maj_name)
      expected_chord_name = "C"
      expect(reformatted_chord_name).to eq(expected_chord_name)
    end

    it "should reformat C7 chord name" do
      reformatted_chord_name = object.reformat_chord_name(c_7_name)
      expected_chord_name = "C_7"
      expect(reformatted_chord_name).to eq(expected_chord_name)
    end

    it "should reformat Csus2 chord name" do
      reformatted_chord_name = object.reformat_chord_name(c_sus2_name)
      expected_chord_name = "C_sus2"
      expect(reformatted_chord_name).to eq(expected_chord_name)
    end

    it "should reformat C major 7 chord name" do
      reformatted_chord_name = object.reformat_chord_name(c_maj7_name)
      expected_chord_name = "C_maj7"
      expect(reformatted_chord_name).to eq(expected_chord_name)
    end
  end

  describe "#reformat_chord_data" do
    it "should reformat chord data" do
      c_expected = {
        name: "C",
        root: "C",
        variant: "",
        strings: "X 3 2 0 1 0"
      }
      c_dim_expected = {
        name: "C_dim",
        root: "C",
        variant: "dim",
        strings: "X 3 4 5 4 X"
      }
      reformatted_chord_data = object.reformat_chord_data(c_chords_json)

      expect(reformatted_chord_data.length).to eq(c_chords_json.length)
      expect(reformatted_chord_data.first[:name]).to eq(c_expected[:name])
      expect(reformatted_chord_data.first[:root]).to eq(c_expected[:root])
      expect(reformatted_chord_data.first[:variant]).to eq(c_expected[:variant])
      expect(reformatted_chord_data.first[:strings]).to eq(c_expected[:strings])
      expect(reformatted_chord_data.last[:name]).to eq(c_dim_expected[:name])
      expect(reformatted_chord_data.last[:root]).to eq(c_dim_expected[:root])
      expect(reformatted_chord_data.last[:variant]).to eq(c_dim_expected[:variant])
      expect(reformatted_chord_data.last[:strings]).to eq(c_dim_expected[:strings])
    end
  end
end
