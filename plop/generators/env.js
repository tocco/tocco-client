export default {
  description: 'Create environment keys in a .env file',
  prompts: [{
    type: 'input',
    name: 'CYPRESS_LOGIN',
    message: 'CYPRESS_LOGIN?'
  },
  {
    type: 'input',
    name: 'SCHEDULER_LICENCE',
    message: 'SCHEDULER_LICENCE?'
  }],
  actions: [{
    type: 'add',
    path: './.env',
    templateFile: './plop/templates/env/env.js'
  }]
}
