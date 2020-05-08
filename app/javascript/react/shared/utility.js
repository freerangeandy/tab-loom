export const convertLineBreaksToParagraphs = (tabContent) => {
  return`<p>${tabContent.trim().replace(/\n/ig, '</p><p>')}</p>`
}

export const insertDashIntoTabContent = (tabContent, curIndex, length = 0) => {
  return tabContent.slice(0, curIndex) + '-' + tabContent.slice(curIndex+length)
}

export const clearStrayFormattingFromText = (text) => {
  let newText = text.replace(/&[^&;]+;| |\./g, '-')
  return newText
}

export const stringArrayToMarkupString = (stringArray) => {
  return `<p>${stringArray.join('</p><p>')}</p>`
}

export const markupStringToStringArray = (markupString) => {
  const markupStringNoEndTags = markupString.replace(/<\/p>/g, '')
  return markupStringNoEndTags.split('<p>').filter(str => str.length > 0)
}
