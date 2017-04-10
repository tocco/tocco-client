import {prompts, getPath} from '../utils'

export default {
  description: 'Create a Redux Action',
  prompts: [
    prompts.package,
    prompts.route,
    prompts.module,
    {
      type: 'input',
      name: 'action',
      message: 'Action Name',
      validate: value => (value ? true : 'action name is required')
    },
    {
      type: 'input',
      name: 'param',
      message: 'Parameter Name'
    }
  ],
  actions: data => {
    const actionFile = getPath(data.package, data.route, data.module) + '/actions.js'

    return [{
      type: 'modify',
      path: actionFile,
      pattern: /^\s*$/m,
      template: 'export const {{constantCase action}} = \'{{camelCase module}}/{{constantCase action}}\'\r\n'
    }, {
      type: 'modify',
      path: actionFile,
      pattern: /$/g,
      templateFile: './plop/templates/action/creator.js'
    }]
  }
}
