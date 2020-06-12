import { COLUMN_COUNT } from './inStringConsts'

export const convertLineBreaksToParagraphs = (tabContent) => {
  const tabContentParagraphs = tabContent.trim().replace(/[\n\r]/ig, '</p><p>')
  return`<p>${tabContentParagraphs}</p>`
}

export const convertParagraphsToLineBreaks = (tabContent) => {
  const tabContentLineBreaks = tabContent.replace(/<\/p><p>/g, '\n')
  return tabContentLineBreaks.replace(/<\/?p>/g, '')
}

export const insertDashIntoTabContent = (tabContent, curIndex, length = 0) => {
  const tabContentLineBreaks = convertParagraphsToLineBreaks(tabContent)
  const contentBeforeDash = tabContentLineBreaks.slice(0, curIndex)
  const contentAfterDash = tabContentLineBreaks.slice(curIndex + length)
  return convertLineBreaksToParagraphs(contentBeforeDash + '-' + contentAfterDash)
}

export const clearStrayFormattingFromText = (text) => {
  let newText = text.replace(/&[^&;]+;| /g, '-')
  return newText
}

export const preventUpdate = (markup) => {
  return (!correctRowCount(markup) || anyRowOverflow(markup))
}
const correctRowCount = (markup) => {
  const rows = [...markup.matchAll(/<p>/g)]
  const rowCount = rows.length
  return rowCount === 6
}

const anyRowOverflow = (markup) => {
  let overflow = false
  const markupSplitCleaned = markup
    .split(/<\/?p>/)
    .map(el => el.trim())
    .filter(el => el.length > 0)

  markupSplitCleaned.forEach((row, rowIdx) => {
    if (row.length > COLUMN_COUNT) {
      console.log(`OVERFLOW (line ${rowIdx + 1})`)
      overflow = true;
    }
  })
  return overflow
}

export const shiftSelectionLeft = (editor, curIndex) => {
  curIndex--
  editor.setSelection(curIndex, 1)
}

export const shiftSelectionRight = (editor, curIndex) => {
  curIndex++
  editor.setSelection(curIndex, 1)
}

export const overtypeStringAtPos = (string, position, char) => {
  const note = `${char}`
  if (note.length + position > COLUMN_COUNT) return string
  return string.slice(0, position) + note + string.slice(position + note.length)
}

export const getContentAfterChordInsert = (content, column, chordNotes) => {
  const splitContent = convertParagraphsToLineBreaks(content).split('\n')
  let splitContentAfterInsert = splitContent.map((row, rowIndex) => {
    return overtypeStringAtPos(row, column, chordNotes[rowIndex])
  })

  const contentAfterInsert = splitContentAfterInsert.join('\n')
  return convertLineBreaksToParagraphs(contentAfterInsert)
}

export const getContentAfterFretNoteInsert = (content, column, stringNum, fretNum) => {
  const splitContent = convertParagraphsToLineBreaks(content).split('\n')
  let splitContentAfterInsert = splitContent.map((row, rowIndex) => {
    if (rowIndex === stringNum - 1) {
      return overtypeStringAtPos(row, column, fretNum)
    } else return row
  })

  const contentAfterInsert = splitContentAfterInsert.join('\n')
  return convertLineBreaksToParagraphs(contentAfterInsert)
}

export const getOffset = (index) => index % (COLUMN_COUNT + 1)
export const indexAtRowEnd = (index) => getOffset(index) === COLUMN_COUNT
export const indexAtRowStart = (index) => getOffset(index) >= 0 && getOffset(index) <= 1

export const normalizeSelection = (editor) => {
  let selectStartIndex = editor.getSelection().index
  while (indexAtRowStart(selectStartIndex)) selectStartIndex++
  while (indexAtRowEnd(selectStartIndex)) selectStartIndex--
  if (selectStartIndex !== editor.getSelection().index || editor.getSelection().length !== 1) {
    editor.setSelection(selectStartIndex, 1)
  }
  return selectStartIndex
}
