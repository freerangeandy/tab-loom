export const E_1 = 'e_1'
export const B_2 = 'b_2'
export const G_3 = 'g_3'
export const D_4 = 'd_4'
export const A_5 = 'a_5'
export const E_6 = 'e_6'

export const IN_STRINGS = [E_1, B_2, G_3, D_4, A_5, E_6]
export const COLUMN_COUNT = 71

const BLANK_LINE = '-'.repeat(COLUMN_COUNT-2)
export const BLANK_TAB = [
  '<p>e|'.concat(BLANK_LINE).concat('</p>'),
  '<p>B|'.concat(BLANK_LINE).concat('</p>'),
  '<p>G|'.concat(BLANK_LINE).concat('</p>'),
  '<p>D|'.concat(BLANK_LINE).concat('</p>'),
  '<p>A|'.concat(BLANK_LINE).concat('</p>'),
  '<p>E|'.concat(BLANK_LINE).concat('</p>')
].join('')
