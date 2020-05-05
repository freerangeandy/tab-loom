import React from "react"

import {E_1, B_2, G_3, D_4, A_5, E_6, IN_STRINGS} from './inStringConsts.js'
import {
  jsonTabToNestedArray,
  nestedArrayToJsonTab,
  nestedArrayToStringArray,
  stringArrayToNestedArray,
  stringArrayToLineBreakString,
  lineBreakStringToStringArray
} from './utility.js'

describe("JSON of strings <=> nested array of strings", () => {
  let testJsonTab, testNestedArray

  beforeEach(() => {
    testJsonTab = {
      [E_1]: '-16,0,h,1,-4,3',
      [B_2]: '-9,13,/,0,-11',
      [G_3]: '8,p,7,-5,18,-1,19,-1,16,-8',
      [D_4]: '-24',
      [A_5]: '0,1,2,2,1,3,1,2,3,4,1,5,12,5,2,4,-8',
      [E_6]: '-1,7,-1,9,-1,12,-1,12,-11,17'
    }

    testNestedArray = [
      ['-16','0','h','1','-4','3'],
      ['-9','13','/','0','-11'],
      ['8','p','7','-5','18','-1','19','-1','16','-8'],
      ['-24'],
      ['0','1','2','2','1','3','1','2','3','4','1','5','12','5','2','4','-8'],
      ['-1','7','-1','9','-1','12','-1','12','-11','17']
    ]
  })
  it('should convert from JSON of strings to nested array of strings', () => {
    expect(jsonTabToNestedArray(testJsonTab)).toEqual(testNestedArray)
  })

  it('should convert from nested array of strings to JSON of strings', () => {
    expect(nestedArrayToJsonTab(testNestedArray)).toEqual(testJsonTab)
  })
})

describe("nested array of strings <=> array of full-line strings", () => {
  let testNestedArray, testStringArray

  beforeEach(() => {
    testNestedArray = [
      ['-16','0h1','-4','3'],
      ['-9','13/0','-11'],
      ['8p7','-5','18','-1','19','-1','16','-8'],
      ['-24'],
      ['01221312341512524','-8'],
      ['-1','7','-1','9','-1','12','-1','12','-11','17']
    ]

    testStringArray = [
      `${'-'.repeat(16)}0h1${'-'.repeat(4)}3`,
      `${'-'.repeat(9)}13/0${'-'.repeat(11)}`,
      `8p7${'-'.repeat(5)}18-19-16${'-'.repeat(8)}`,
      '-'.repeat(24),
      `01221312341512524${'-'.repeat(8)}`,
      `-7-9-12-12${'-'.repeat(11)}17`
    ]
  })

  it('should convert from nested array of strings to array of full-line strings', () => {
    expect(nestedArrayToStringArray(testNestedArray)).toEqual(testStringArray)
  })

  it('should convert from array of full-line strings to nested array of strings', () => {
    expect(stringArrayToNestedArray(testStringArray)).toEqual(testNestedArray)
  })
})

describe("array of full-line strings <=> string with line breaks", () => {
  let testStringArray, testLineBreakString

  beforeEach(() => {
    testStringArray = [
      `${'-'.repeat(16)}0h1${'-'.repeat(4)}3`,
      `${'-'.repeat(9)}13/0${'-'.repeat(11)}`,
      `8p7${'-'.repeat(5)}18-19-16${'-'.repeat(8)}`,
      '-'.repeat(24),
      `01221312341512524${'-'.repeat(8)}`,
      `-7-9-12-12${'-'.repeat(11)}17`
    ]

    testLineBreakString = `${'-'.repeat(16)}0h1${'-'.repeat(4)}3<br>${'-'.repeat(9)}13/0`
    + `${'-'.repeat(11)}<br>8p7${'-'.repeat(5)}18-19-16${'-'.repeat(8)}<br>`
    + `${'-'.repeat(24)}<br>01221312341512524${'-'.repeat(8)}<br>-7-9-12-12${'-'.repeat(11)}17`
  })

  it('should convert from array of full-line strings to string with line breaks', () => {
    expect(stringArrayToLineBreakString(testStringArray)).toEqual(testLineBreakString)
  })

  it('should convert from string with line breaks to array of full-line strings', () => {
    expect(lineBreakStringToStringArray(testLineBreakString)).toEqual(testStringArray)
  })
})
