export const convertLineBreaksToParagraphs = (tabContent) => {
  return`<p>${tabContent.trim().replace(/\n/ig, '</p><p>')}</p>`
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
  let newText = text.replace(/&[^&;]+;| |\./g, '-')
  return newText
}
