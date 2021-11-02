import ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/src-min-noconflict/mode-sql'
import _mergeWith from 'lodash/mergeWith'
import _isArray from 'lodash/isArray'

// TODO implement
export class TqlHighlightRules extends ace.require('ace/mode/sql_highlight_rules').SqlHighlightRules {
  constructor() {
    super()
    const customRules = {
      start: [
      ]
    }
    this.$rules = _mergeWith(
      this.$rules,
      customRules,
      (objValue, srcValue) => _isArray(objValue) ? objValue.concat(srcValue) : undefined
    )
  }
}

// TODO implement
const TqlCompleter = () => ({
  getCompletions: function(editor, session, pos, prefix) {
    return [
    ]
  }
})

export default class TqlMode extends ace.require('ace/mode/sql').Mode {
  constructor() {
    super()
    this.HighlightRules = TqlHighlightRules
    this.getCompletions = TqlCompleter().getCompletions
    this.snippedIdField = null // TODO implement?
  }
}
