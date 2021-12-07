import {getPath, prompts} from '../utils'

export default {
  description: 'Create a React Component',
  prompts: [
    prompts.package,
    prompts.route,
    {
      type: 'input',
      name: 'componentName',
      message: 'Component Name',
      validate: value => (value ? true : 'action name is required')
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What features would you like to use?',
      choices: [{name: 'Tests', value: 'tests', checked: true}]
    }
  ],
  actions: data => {
    const actions = []
    const baseTemplateFolder = './plop/templates/component'

    let targetFolder = getPath(data.package, data.route)
    targetFolder += '/components/{{pascalCase componentName}}'

    actions.push({
      type: 'add',
      path: `${targetFolder}/{{pascalCase componentName}}.js`,
      templateFile: `${baseTemplateFolder}/stateless.js`
    })

    actions.push({
      type: 'add',
      path: `${targetFolder}/index.js`,
      templateFile: `${baseTemplateFolder}/index.js`
    })

    if (data.features.includes('tests')) {
      actions.push({
        type: 'add',
        path: `${targetFolder}/{{pascalCase componentName}}.specs.js`,
        templateFile: `${baseTemplateFolder}/tests.js`
      })
    }

    return actions
  }
}
