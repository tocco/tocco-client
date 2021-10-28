import ace from 'ace-builds/src-min-noconflict/ace'
import _mergeWith from 'lodash/mergeWith'
import _isArray from 'lodash/isArray'

// TODO nonsense mode to experiment with ace editor customization
export class CustomHighlightRules extends ace.acequire('ace/mode/sql_highlight_rules').SqlHighlightRules {
  constructor() {
    super()
    const customRules = {
      start: [
        {
          token: 'comment',
          regex: '#.*$'
        },
        {
          token: 'string',
          regex: '\\\\.*?\\\\'
        }
      ]
    }
    this.$rules = _mergeWith(
      this.$rules,
      customRules,
      (objValue, srcValue) => _isArray(objValue) ? objValue.concat(srcValue) : undefined
    )
  }
}

const CustomCompleter = () => ({
  getCompletions: function(editor, session, pos, prefix) {
    return [
      {name: 'name', value: 'value', score: 10, meta: 'fake'}
    ]
  }
})

export default class CustomMode extends ace.acequire('ace/mode/sql').Mode {
  constructor() {
    super()
    this.HighlightRules = CustomHighlightRules
    this.getCompletions = CustomCompleter().getCompletions
    this.snippedIdField = null
  }
}
