import _debug from 'debug'
import fs from 'fs'
import glob from 'glob'

export const updateMutableImportSCSS = function() {
  const debug = _debug('app:build:MutableImportSCSS')
  const baseDir = `${__dirname}/..`
  const output = `${baseDir}/packages/tocco-theme/src/ToccoTheme/variable/mutable-imports.scss`
  const searchRegex = 'packages/*/src/**/*.scss'
  const options = {
    ignore: 'packages/tocco-theme/**'
  }
  glob(searchRegex, options, function(er, files) {
    const header = `/* written by app:build:MutableimportSCSS at ${new Date()} */\n`
    const content = header + files.map(f => `@import '${f}';\n`).join('')
    fs.writeFileSync(output, content, 'utf8')
    debug(`${files.length} scss files are imported by ${output}`)
  })
}
