export default {
  description: 'Create secret environment variables in a .env file',
  prompts: [{
    type: 'input',
    name: 'CYPRESS_USER',
    message: 'CYPRESS_USER:'
  },
  {
    type: 'input',
    name: 'CYPRESS_PASSWORD',
    message: 'CYPRESS_PASSWORD:'
  },
  {
    type: 'input',
    name: 'FULL_CALENDAR_LICENCE',
    message: 'FULL_CALENDAR_LICENCE (Setting this is optional for local development but mandatory for releases):'
  }],
  actions: [{
    type: 'add',
    path: './.env',
    templateFile: './plop/templates/env/env.js'
  }]
}
