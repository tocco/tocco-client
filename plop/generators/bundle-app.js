import {getAllPackagesInDirectory, getPackageDirectory} from '../../build/lib/packages'
import {prompts} from '../utils'

export default {
  description: 'Add an app/widget to a npm package for bundling and shipping',
  prompts: [
    {
      type: 'rawlist',
      name: 'app',
      message: 'App / Widget Name (e.g. address-update)',
      validate: value => (value ? true : 'app name is required'),
      choices: prompts.package.choices
    },
    {
      type: 'rawlist',
      name: 'package',
      message: 'Bundle package name (e.g. widget-bundle)',
      validate: value => (value ? true : 'bundle package name is required'),
      choices: getAllPackagesInDirectory('bundles')
    }
  ],
  actions: data => {
    const baseTemplateFolder = './plop/templates/bundle-app'
    const packageDir = getPackageDirectory(data.package)
    const appDir = getPackageDirectory(data.app)

    return [
      {
        type: 'add',
        path: `${packageDir}/src/apps/{{kebabCase app}}.js`,
        templateFile: `${baseTemplateFolder}/appRegistry.js`
      },
      {
        type: 'modify',
        path: `${packageDir}/package.json`,
        pattern: /(devDependencies.*"\*")/gs,
        template: '$1,\n    "tocco-{{kebabCase app}}": "*"'
      },
      {
        type: 'modify',
        path: `${appDir}/src/main.js`,
        pattern: /(export default) (.*)\n/g,
        template: '$1 $2\nexport const app = appFactory.createBundleableApp(packageName, initApp, $2)\n'
      }
    ]
  }
}
