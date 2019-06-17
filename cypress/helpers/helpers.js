const convert = s => s.replace(/ /g, '-').toLowerCase()

const getStoryUrl = (chapter, story) => {
  const PR_BRANCH = Cypress.env('PR_BRANCH')
  const URL_BRANCH = PR_BRANCH ? PR_BRANCH.replace('/', '_') : ''
  const DEPLOY_URL = `https://tocco.github.io/tocco-client/${URL_BRANCH || 'master'}`
  return `${DEPLOY_URL}/iframe.html?id=${chapter.map(c => convert(c)).join('-')}--${convert(story)}#/`
}

export default {getStoryUrl}
