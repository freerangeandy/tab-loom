import {E_1, B_2, G_3, D_4, A_5, E_6, IN_STRINGS} from './inStringConsts.js'

// internal
const dashBlockToString = dashBlock => {
  const dashCount = parseInt(dashBlock.slice(1))
  return '-'.repeat(dashCount)
}

const dashStringToBlock = dashString => {
  return `-${dashString.length}`
}

// for export
export const jsonTabToNestedArray = (jsonObj) => {
  let nestedArray = []
  nestedArray = IN_STRINGS.map(inString => {
    return jsonObj[inString].split(',')
  })
  return nestedArray
}

export const nestedArrayToJsonTab = (nestedArray) => {
  let jsonTab = {}
  IN_STRINGS.forEach((inString, inStringIdx) => {
    jsonTab[inString] = nestedArray[inStringIdx].join()
  })
  return jsonTab
}

export const nestedArrayToStringArray = (nestedArray) => {
  return nestedArray.map(notationArray => {
    const notationString = notationArray.reduce((notationAcc, notation) => {
      if (notation.startsWith('-')) {
        return notationAcc.concat(dashBlockToString(notation))
      } else {
        return notationAcc.concat(notation)
      }
    }, '')
    return notationString
  })
}

export const stringArrayToNestedArray = (stringArray) => {
  return stringArray.map(notationString => {
    const notationChunks = notationString
      .split(/(-+)/)
      .filter(str => str.length > 0)
    return notationChunks.map(notationChunk => {
      if (notationChunk.startsWith('-')) {
        return `-${notationChunk.length}`
      } else {
        return notationChunk
      }
    })
  })
}

export const stringArrayToLineBreakString = (stringArray) => {
  return stringArray.join('<br>')
}

export const lineBreakStringToStringArray = (lineBreakString) => {
  return lineBreakString.split('<br>')
}
