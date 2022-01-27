import ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/src-min-noconflict/mode-ftl'

import ToccoFtlHighlightRules from './FtlHighlighter'
import TqlAutoCompleter from './TqlAutoCompleter'

export default class ToccoFtlMode extends ace.require('ace/mode/ftl').Mode {
  constructor() {
    super()
    this.HighlightRules = ToccoFtlHighlightRules
    this.completer = TqlAutoCompleter()
  }
}
