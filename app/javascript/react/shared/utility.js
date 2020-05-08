export const convertLineBreaksToParagraphs = (tabContent) => {
  return`<p>${tabContent.trim().replace(/\n/ig, '</p><p>')}</p>`
}

export const insertDashIntoTabContent = (tabContent, curIndex, length = 0) => {
  const paragraphBuffer = 3
  const contentBeforeDash = tabContent.slice(0, paragraphBuffer + curIndex)
  const contentAfterDash = tabContent.slice(paragraphBuffer + curIndex + length)
  return contentBeforeDash + '-' + contentAfterDash
}

export const clearStrayFormattingFromText = (text) => {
  let newText = text.replace(/&[^&;]+;| |\./g, '-')
  return newText
}
