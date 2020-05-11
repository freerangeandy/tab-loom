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

const getOffset = (index) => index % (COLUMN_COUNT + 1)
export const indexAtRowEnd = (index) => getOffset(index) === COLUMN_COUNT
export const indexAtRowStart = (index) => getOffset(index) >= 0 && getOffset(index) <= 1
