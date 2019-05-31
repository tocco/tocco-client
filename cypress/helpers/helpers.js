const convert = s => s.replace(/ /g, '-').toLowerCase()

const getStoryUrl = (chapter, story) =>
  `/iframe.html?id=${chapter.map(c => convert(c)).join('-')}--${convert(story)}#/`

export default {getStoryUrl}
