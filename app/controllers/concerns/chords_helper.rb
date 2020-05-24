module ChordsHelper
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
      chord_name_split = chord_obj["chordName"].split(',')
      reformatted_chord_name = reformat_chord_name(chord_obj["chordName"])
      chord_variant = "#{chord_name_split[1].to_s}#{chord_name_split[2].to_s}"
      {
        name: reformatted_chord_name,
        root: chord_name_split[0],
        variant: chord_variant,
        strings: chord_obj["strings"]
      }
    end
  end
end
