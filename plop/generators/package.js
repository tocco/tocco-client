export default {
  description: 'Create a package in the mono-repo',
  prompts: [
    {
      type: 'input',
      name: 'package',
      message: 'Package Name',
      validate: value => (value ? true : 'package name is required')
    },
    {
      type: 'input',
      name: 'folder',
      message: 'Folder (widgets, actions, apps, core, bundles)',
      validate: value => (value ? true : 'folder name is required')
    }
  ],
  actions: data => {
    const actions = []

    const baseTemplateFolder = './plop/templates/package'
    const targetFolder = 'packages/{{folder}}/{{kebabCase package}}'

    const files = [
      'README.md',
      'changelog.md',
      'package.json',
      '.yarnrc',
      '.npmignore',
      'jest.config.js',
      '/src/main.js',
      '/src/modules/reducers.js',
      '/src/dev/fetchMocks.js',
      '/src/dev/input.json',
      '/src/dev/textResources.json'
    ]

    files.forEach(file => {
      actions.push({
        type: 'add',
        path: `${targetFolder}/${file}`,
        templateFile: `${baseTemplateFolder}/${file}`
      })
    })

    return actions
  }
}
