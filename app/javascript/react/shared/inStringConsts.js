export const COLUMN_COUNT = 71
export const STEP_SIZE = 2

const BLANK_LINE = '-'.repeat(COLUMN_COUNT-2)
export const BLANK_TAB = [
  '<p>e|'.concat(BLANK_LINE).concat('</p>'),
  '<p>B|'.concat(BLANK_LINE).concat('</p>'),
  '<p>G|'.concat(BLANK_LINE).concat('</p>'),
  '<p>D|'.concat(BLANK_LINE).concat('</p>'),
  '<p>A|'.concat(BLANK_LINE).concat('</p>'),
  '<p>E|'.concat(BLANK_LINE).concat('</p>')
].join('')

export const ROOTS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
export const VARIANT = ["", "m", "7", "m7", "maj7", "sus2", "sus4", "dim"]
export const DISPLAY_VARIANT = {
  [VARIANT[0]]: "M",
  [VARIANT[1]]: "m",
  [VARIANT[2]]: "7",
  [VARIANT[3]]: "m7",
  [VARIANT[4]]: "M7",
  [VARIANT[5]]: "sus2",
  [VARIANT[6]]: "sus4",
  [VARIANT[7]]: "dim"
}

export const ALT_ROOTS = {
  [ROOTS[0]]: ROOTS[0],
  [ROOTS[1]]: "Db",
  [ROOTS[2]]: ROOTS[2],
  [ROOTS[3]]: "Eb",
  [ROOTS[4]]: ROOTS[4],
  [ROOTS[5]]: ROOTS[5],
  [ROOTS[6]]: "Gb",
  [ROOTS[7]]: ROOTS[7],
  [ROOTS[8]]: "Ab",
  [ROOTS[9]]: ROOTS[9],
  [ROOTS[10]]: "Bb",
  [ROOTS[11]]: ROOTS[11]
}
