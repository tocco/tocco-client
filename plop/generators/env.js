export default {
  description: 'Create secret environment variables in a .env file',
  prompts: [
    {
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
      name: 'CYPRESS_API_KEY',
      message: 'CYPRESS_API_KEY:'
    },
    {
      type: 'input',
      name: 'CYPRESS_USER_PASSWORD_HASH',
      message: 'CYPRESS_USER_PASSWORD_HASH:'
    },
    {
      type: 'input',
      name: 'CYPRESS_USER_API_KEY_HASH',
      message: 'CYPRESS_USER_API_KEY_HASH:'
    },
    {
      type: 'input',
      name: 'FULL_CALENDAR_LICENCE',
      message: 'FULL_CALENDAR_LICENCE (Setting this is optional for local development but mandatory for releases):'
    },
    {
      type: 'input',
      name: 'NICE2_REPO_BASE_PATH',
      message: 'NICE2_REPO_BASE_PATH (root path to all nice2 repositories >= v3.0):'
    }
  ],
  actions: [
    {
      type: 'add',
      path: './.env',
      templateFile: './plop/templates/env/env.js'
    }
  ]
}
