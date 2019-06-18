const convert = s => s.replace(/ /g, '-').toLowerCase()

const getStoryUrl = (chapter, story) => {
  const prBranch = Cypress.env('PR_BRANCH')
  const deployUrl = `https://tocco.github.io/tocco-client/${prBranch ? prBranch.replace('/', '_') : 'master'}`
  return `${deployUrl}/iframe.html?id=${chapter.map(c => convert(c)).join('-')}--${convert(story)}#/`
}

export default {getStoryUrl}
