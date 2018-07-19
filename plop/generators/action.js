/* eslint-disable indent */
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
      name: 'params',
      message: 'Parameter Name'
    }
  ],
  actions: data => {
    const actionFile = getPath(data.package, data.route, data.module) + '/actions.js'

    data.hasParams = data.params
    data.paramsLengthNotOne = !data.hasParams || data.params.split(',').length > 1
    const paramsArray = data.params.split(',').map(p => p.trim())
    data.paramsFormatted = paramsArray.join(', ')
    const indent = '    '
    data.paramsNewLine = paramsArray.join(`,\n${indent}`)

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
