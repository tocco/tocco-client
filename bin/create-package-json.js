import fs from 'fs'
import path from 'path'

export default class CreatePackageJsonPlugin {

  constructor(options) {
    this.options = Object.assign({}, options, {})
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      const sourceJson = require(this.options.sourcePackageFile)
      const { name, version, description, main, peerDependencies } = sourceJson
      const newJson = { name, version, description, main, peerDependencies }

      const targetPath = path.resolve(this.options.targetDir, 'package.json')

      fs.writeFileSync(targetPath, JSON.stringify(newJson, 0, 2))
    })
  }
}
