import React from "react"
import { BLANK_TAB, COLUMN_COUNT } from './inStringConsts'
import {
  overtypeStringAtPos,
  getContentAfterChordInsert
} from './utility.js'

describe("overtypeStringAtPos", () => {
  let testString, overwriteChar

  beforeEach(() => {
    testString = "0123456"
    overwriteChar = "y"
  })

  it('should not return a string of different length than the input', () => {
    const overwritePos = 3
    const stringAfterOverwrite = overtypeStringAtPos(testString, overwritePos, overwriteChar)
    expect(stringAfterOverwrite.length).toEqual(testString.length)
  })

  it('should replace the existing char at target position with the overwrite char', () => {
    const overwritePos = 3
    const previousCharAtPos = testString.charAt(overwritePos)
    const stringAfterOverwrite = overtypeStringAtPos(testString, overwritePos, overwriteChar)
    expect(stringAfterOverwrite.indexOf(previousCharAtPos)).toEqual(-1)
    expect(stringAfterOverwrite.charAt(overwritePos)).toEqual(overwriteChar)
  })

  it('should not return a string of different length than the input when overwriting last character', () => {
    const overwritePos = testString.length - 1
    const stringAfterOverwrite = overtypeStringAtPos(testString, overwritePos, overwriteChar)
    expect(stringAfterOverwrite.length).toEqual(testString.length)
  })

  it('should replace the lat char at target position with the overwrite char', () => {
    const overwritePos = testString.length - 1
    const previousCharAtPos = testString.charAt(overwritePos)
    const stringAfterOverwrite = overtypeStringAtPos(testString, overwritePos, overwriteChar)
    expect(stringAfterOverwrite.indexOf(previousCharAtPos)).toEqual(-1)
    expect(stringAfterOverwrite.charAt(overwritePos)).toEqual(overwriteChar)
  })
})

describe("getContentAfterChordInsert", () => {
  let testContent, testChordNotes, testColumn, numActiveCols, prefixLength

  beforeEach(() => {
    testContent = BLANK_TAB
    prefixLength = 2
    numActiveCols = COLUMN_COUNT - prefixLength
    testChordNotes = [3, 2, 0, 0, 0, 3]
  })

  it('should insert a chord into the first column (after row prefix)', () => {
    testColumn = prefixLength + 0
    const expectedContent = [
      '<p>e|'.concat(testChordNotes[5]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>B|'.concat(testChordNotes[4]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>G|'.concat(testChordNotes[3]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>D|'.concat(testChordNotes[2]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>A|'.concat(testChordNotes[1]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>E|'.concat(testChordNotes[0]).concat('-'.repeat(numActiveCols - 1)).concat('</p>')
    ].join('')

    const contentAfterInsert = getContentAfterChordInsert(testContent, testColumn, testChordNotes)
    expect(contentAfterInsert).toEqual(expectedContent)
  })

  it('should insert a chord into the last column', () => {
    testColumn = prefixLength + numActiveCols - 1
    const expectedContent = [
      '<p>e|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[5]).concat('</p>'),
      '<p>B|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[4]).concat('</p>'),
      '<p>G|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[3]).concat('</p>'),
      '<p>D|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[2]).concat('</p>'),
      '<p>A|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[1]).concat('</p>'),
      '<p>E|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[0]).concat('</p>')
    ].join('')

    const contentAfterInsert = getContentAfterChordInsert(testContent, testColumn, testChordNotes)
    expect(contentAfterInsert).toEqual(expectedContent)
  })

  it('should insert a chord into any column', () => {
    testColumn = prefixLength + 17
    const rowBefore = '-'.repeat(17)
    const rowAfter = '-'.repeat(numActiveCols - 1 - 17)

    const expectedContent =  [
      '<p>e|'.concat(rowBefore).concat(testChordNotes[5]).concat(rowAfter).concat('</p>'),
      '<p>B|'.concat(rowBefore).concat(testChordNotes[4]).concat(rowAfter).concat('</p>'),
      '<p>G|'.concat(rowBefore).concat(testChordNotes[3]).concat(rowAfter).concat('</p>'),
      '<p>D|'.concat(rowBefore).concat(testChordNotes[2]).concat(rowAfter).concat('</p>'),
      '<p>A|'.concat(rowBefore).concat(testChordNotes[1]).concat(rowAfter).concat('</p>'),
      '<p>E|'.concat(rowBefore).concat(testChordNotes[0]).concat(rowAfter).concat('</p>')
    ].join('')

    const contentAfterInsert = getContentAfterChordInsert(testContent, testColumn, testChordNotes)
    expect(contentAfterInsert).toEqual(expectedContent)
  })
})

// import {E_1, B_2, G_3, D_4, A_5, E_6, IN_STRINGS} from './inStringConsts.js'
// describe("JSON of strings <=> nested array of strings", () => {
//   let testJsonTab, testNestedArray
//
//   beforeEach(() => {
//     testJsonTab = {
//       [E_1]: '-16,0,h,1,-4,3',
//       [B_2]: '-9,13,/,0,-11',
//       [G_3]: '8,p,7,-5,18,-1,19,-1,16,-8',
//       [D_4]: '-24',
//       [A_5]: '0,1,2,2,1,3,1,2,3,4,1,5,12,5,2,4,-8',
//       [E_6]: '-1,7,-1,9,-1,12,-1,12,-11,17'
//     }
//
//     testNestedArray = [
//       ['-16','0','h','1','-4','3'],
//       ['-9','13','/','0','-11'],
//       ['8','p','7','-5','18','-1','19','-1','16','-8'],
//       ['-24'],
//       ['0','1','2','2','1','3','1','2','3','4','1','5','12','5','2','4','-8'],
//       ['-1','7','-1','9','-1','12','-1','12','-11','17']
//     ]
//   })
//   it('should convert from JSON of strings to nested array of strings', () => {
//     expect(jsonTabToNestedArray(testJsonTab)).toEqual(testNestedArray)
//   })
//
//   it('should convert from nested array of strings to JSON of strings', () => {
//     expect(nestedArrayToJsonTab(testNestedArray)).toEqual(testJsonTab)
//   })
// })
//
// describe("nested array of strings <=> array of full-line strings", () => {
//   let testNestedArray, testStringArray
//
//   beforeEach(() => {
//     testNestedArray = [
//       ['-16','0h1','-4','3'],
//       ['-9','13/0','-11'],
//       ['8p7','-5','18','-1','19','-1','16','-8'],
//       ['-24'],
//       ['01221312341512524','-8'],
//       ['-1','7','-1','9','-1','12','-1','12','-11','17']
//     ]
//
//     testStringArray = [
//       `${'-'.repeat(16)}0h1${'-'.repeat(4)}3`,
//       `${'-'.repeat(9)}13/0${'-'.repeat(11)}`,
//       `8p7${'-'.repeat(5)}18-19-16${'-'.repeat(8)}`,
//       '-'.repeat(24),
//       `01221312341512524${'-'.repeat(8)}`,
//       `-7-9-12-12${'-'.repeat(11)}17`
//     ]
//   })
//
//   it('should convert from nested array of strings to array of full-line strings', () => {
//     expect(nestedArrayToStringArray(testNestedArray)).toEqual(testStringArray)
//   })
//
//   it('should convert from array of full-line strings to nested array of strings', () => {
//     expect(stringArrayToNestedArray(testStringArray)).toEqual(testNestedArray)
//   })
// })
//
// describe("array of full-line strings <=> markup string", () => {
//   let testStringArray, testMarkupString
//
//   beforeEach(() => {
//     testStringArray = [
//       `${'-'.repeat(16)}0h1${'-'.repeat(4)}3`,
//       `${'-'.repeat(9)}13/0${'-'.repeat(11)}`,
//       `8p7${'-'.repeat(5)}18-19-16${'-'.repeat(8)}`,
//       '-'.repeat(24),
//       `01221312341512524${'-'.repeat(8)}`,
//       `-7-9-12-12${'-'.repeat(11)}17`
//     ]
//
//     testMarkupString = `<p>${'-'.repeat(16)}0h1${'-'.repeat(4)}3</p><p>${'-'.repeat(9)}13/0`
//     + `${'-'.repeat(11)}</p><p>8p7${'-'.repeat(5)}18-19-16${'-'.repeat(8)}</p><p>`
//     + `${'-'.repeat(24)}</p><p>01221312341512524${'-'.repeat(8)}</p><p>-7-9-12-12${'-'.repeat(11)}17</p>`
//   })
//
//   it('should convert from array of full-line strings to markup string', () => {
//     expect(stringArrayToMarkupString(testStringArray)).toEqual(testMarkupString)
//   })
//
//   it('should convert from markup string to array of full-line strings', () => {
//     expect(markupStringToStringArray(testMarkupString)).toEqual(testStringArray)
//   })
// })
