import _debug from 'debug'
import find from 'find'
import fsExtra from 'fs-extra'

export const updateMutableImportSCSS = function() {
  const debug = _debug('app:build:MutableImportSCSS')
  const now = Date.now()
  const baseDir = `${__dirname}/..`
  const searchRoot = `${baseDir}/packages`
  // find all scss fils which are in a src folder but not belogs to ToccoTheme
  const searchRegex = /\/src\/(?!ToccoTheme)[a-zA-Z0-9-\/]*.scss$/  // eslint-disable-line no-useless-escape
  const output = `${baseDir}/packages/tocco-theme/src/ToccoTheme/variable/mutable-imports.scss`
  let countMatches = 0

  // ensure empty file
  fsExtra.ensureFileSync(output)
  fsExtra.writeFile(output, `/* written by app:build:MutableimportSCSS at ${now} */\n`)

  // find files and output it
  find.file(searchRegex, searchRoot, function(files) {
    for (let key in files) {
      countMatches++
      fsExtra.appendFile(output, `@import '${files[key]}';\n`, 'utf8')
    }
    debug(`${countMatches} scss files are imported by ${output}`)
  })
}
