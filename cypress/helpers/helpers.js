const convert = s => s.replace(/ /g, '-').toLowerCase()

const githubPages = 'https://tocco.github.io/tocco-client'

const getStoryUrl = (chapter, story) => {
  const prBranch = Cypress.env('PR_BRANCH')

  const deployUrl = Cypress.config().baseUrl
    ? Cypress.config().baseUrl
    : githubPages + `/${prBranch ? prBranch.replace('/', '_') : 'master'}`

  return `${deployUrl}/iframe.html?id=${chapter.map(c => convert(c)).join('-')}--${convert(story)}#/`
}

export default {getStoryUrl}
