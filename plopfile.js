const getAllPackages = require('./bin/packages').getAllPackages

module.exports = function(plop) {
  plop.addHelper('ifIn', (val, arr, options) => {
    if (arr.includes(val)) {
      return options.fn(this)
    }
    return options.inverse(this)
  })

  const packagePrompt = {
    type: 'rawlist',
    name: 'package',
    message: 'Package Name',
    choices: getAllPackages()
  }

  plop.setGenerator('Component', {
    description: 'Create a React Component',
    prompts: [
      packagePrompt,
      {
        type: 'input',
        name: 'componentName',
        message: 'Component Name',
        validate: value => {
          if ((/.+/).test(value)) {
            return true
          }
          return 'name is required'
        }
      }, {
        type: 'confirm',
        name: 'stateless',
        message: 'Stateless component?'
      }, {
        type: 'checkbox',
        name: 'features',
        message: 'What features would you like?',
        choices: [
          {name: 'Tests', value: 'tests', checked: true},
          {name: 'Tocco-Ui', value: 'toccoui'}
        ]
      }],
    actions: data => {
      let actions = []

      const baseTemplateFolder = 'templates/component'
      const targetFolder = 'packages/{{kebabCase package}}/src/components/{{pascalCase componentName}}'

      actions.push({
        type: 'add',
        path: `${targetFolder}/{{pascalCase componentName}}.js`,
        templateFile: data.stateless ? `${baseTemplateFolder}/stateless.js` : `${baseTemplateFolder}/stateful.js`
      })

      actions.push({
        type: 'add',
        path: `${targetFolder}//index.js`,
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
  })

  plop.setGenerator('Action', {
    description: 'Create a Redux Action',
    prompts: [
      packagePrompt,
      {
        type: 'input',
        name: 'module',
        message: 'Module Name',
        validate: value => {
          if ((/.+/).test(value)) {
            return true
          }
          return 'module name is required'
        }
      },
      {
        type: 'input',
        name: 'action',
        message: 'Action Name',
        validate: value => {
          if ((/.+/).test(value)) {
            return true
          }
          return 'action name is required'
        }
      },
      {
        type: 'input',
        name: 'param',
        message: 'Parameter Name'
      }
    ],
    actions: data => {
      const actionFile = 'packages/{{kebabCase package}}/src/modules/{{camelCase module}}/actions.js'

      return [{
        type: 'modify',
        path: actionFile,
        pattern: /^\s*$/m,
        template: 'export const {{constantCase action}} = \'{{camelCase module}}/{{constantCase action}}\'\r\n'
      }, {
        type: 'modify',
        path: actionFile,
        pattern: /$/g,
        templateFile: 'templates/action/creator.js'
      }]
    }
  })
}
