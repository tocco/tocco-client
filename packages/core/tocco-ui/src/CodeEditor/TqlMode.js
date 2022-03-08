import ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/src-min-noconflict/mode-text'

import TqlAutoCompleter from './TqlAutoCompleter'
import TqlHighlighter from './TqlHighlighter'

export default class TqlMode extends ace.require('ace/mode/text').Mode {
  constructor({implicitModelName}) {
    super()
    this.HighlightRules = TqlHighlighter(implicitModelName)
    this.completer = TqlAutoCompleter(implicitModelName)
    this.snippedIdField = null // TODO implement? TOCDEV-4499
  }
}
