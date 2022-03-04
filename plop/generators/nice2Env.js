export default {
  description: 'Create secret nice2 environment variables in a .nice2.env file',
  prompts: [
    {
      type: 'input',
      name: 'HIBERNATE_MAIN_SERVERNAME',
      message: 'HIBERNATE_MAIN_SERVERNAME (e.g. localhost):'
    },
    {
      type: 'input',
      name: 'HIBERNATE_MAIN_USER',
      message: 'HIBERNATE_MAIN_USER (e.g. nice):'
    },
    {
      type: 'input',
      name: 'HIBERNATE_MAIN_PASSWORD',
      message: 'HIBERNATE_MAIN_PASSWORD:'
    },
    {
      type: 'input',
      name: 'HIBERNATE_MAIN_DATABASENAME',
      message: 'HIBERNATE_MAIN_DATABASENAME (e.g. nice):'
    },
    {
      type: 'input',
      name: 'NICE2_REPO',
      message: 'NICE2_REPO (e.g. ~/tocco/nice2-master):'
    },
    {
      type: 'input',
      name: 'CYPRESS_PRINCIPAL_PASSWORD_HASH',
      message: 'CYPRESS_PRINCIPAL_PASSWORD_HASH:'
    },
    {
      type: 'input',
      name: 'CYPRESS_PRINCIPAL_API_KEY_HASH',
      message: 'CYPRESS_PRINCIPAL_API_KEY_HASH:'
    }
  ],
  actions: [
    {
      type: 'add',
      path: './.nice2.env',
      templateFile: './plop/templates/env/nice2Env.js'
    }
  ]
}
