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
      '<p>e|'.concat(testChordNotes[0]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>B|'.concat(testChordNotes[1]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>G|'.concat(testChordNotes[2]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>D|'.concat(testChordNotes[3]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>A|'.concat(testChordNotes[4]).concat('-'.repeat(numActiveCols - 1)).concat('</p>'),
      '<p>E|'.concat(testChordNotes[5]).concat('-'.repeat(numActiveCols - 1)).concat('</p>')
    ].join('')

    const contentAfterInsert = getContentAfterChordInsert(testContent, testColumn, testChordNotes)
    expect(contentAfterInsert).toEqual(expectedContent)
  })

  it('should insert a chord into the last column', () => {
    testColumn = prefixLength + numActiveCols - 1
    const expectedContent = [
      '<p>e|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[0]).concat('</p>'),
      '<p>B|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[1]).concat('</p>'),
      '<p>G|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[2]).concat('</p>'),
      '<p>D|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[3]).concat('</p>'),
      '<p>A|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[4]).concat('</p>'),
      '<p>E|'.concat('-'.repeat(numActiveCols - 1)).concat(testChordNotes[5]).concat('</p>')
    ].join('')

    const contentAfterInsert = getContentAfterChordInsert(testContent, testColumn, testChordNotes)
    expect(contentAfterInsert).toEqual(expectedContent)
  })

  it('should insert a chord into any column', () => {
    testColumn = prefixLength + 17
    const rowBefore = '-'.repeat(17)
    const rowAfter = '-'.repeat(numActiveCols - 1 - 17)

    const expectedContent =  [
      '<p>e|'.concat(rowBefore).concat(testChordNotes[0]).concat(rowAfter).concat('</p>'),
      '<p>B|'.concat(rowBefore).concat(testChordNotes[1]).concat(rowAfter).concat('</p>'),
      '<p>G|'.concat(rowBefore).concat(testChordNotes[2]).concat(rowAfter).concat('</p>'),
      '<p>D|'.concat(rowBefore).concat(testChordNotes[3]).concat(rowAfter).concat('</p>'),
      '<p>A|'.concat(rowBefore).concat(testChordNotes[4]).concat(rowAfter).concat('</p>'),
      '<p>E|'.concat(rowBefore).concat(testChordNotes[5]).concat(rowAfter).concat('</p>')
    ].join('')

    const contentAfterInsert = getContentAfterChordInsert(testContent, testColumn, testChordNotes)
    expect(contentAfterInsert).toEqual(expectedContent)
  })
})
