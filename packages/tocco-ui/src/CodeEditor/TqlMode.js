import ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/src-min-noconflict/mode-text'
import _mergeWith from 'lodash/mergeWith'
import _isArray from 'lodash/isArray'

import TqlAutoCompleter from './TqlAutoCompleter'

export const operators = ['==', '!=', '<=', '>=', '<', '>', '~=']
export const atoms = ['true', 'false', 'null']
export const types = [
  'string', 'long', 'serial', 'bool', 'boolean', 'double', 'float', 'time', 'timestamp', 'char', 'varchar', 'date',
  'datetime'
]
export const placeholders = [
  'now_date', 'yesterday_date', 'tomorrow_date', 'today_date', 'now_start', 'yesterday_start', 'tomorrow_start',
  'today_start', 'now', 'yesterday', 'tomorrow', 'today', 'currentUsername', 'currentUser', 'currentBu'
]
export const functions = [
  'in', 'dateadd', 'datetimeadd', 'duedate', 'birthdayin', 'fulltext', 'likeall', 'distance', 'inboundingbox'
]

export class TqlHighlightRules extends ace.require('ace/mode/text_highlight_rules').TextHighlightRules {
  constructor() {
    super()

    const commonWhere = [
      {
        token: 'keyword.operator.conjunction',
        regex: /(\s*)(and|or|not)($|\s+)/,
        caseInsensitive: true
      },
      {
        token: 'support.class.relation',
        regex: /rel/,
        push: 'model'
      },
      {
        token: 'keyword.exists',
        regex: /exists\s*/,
        push: 'exists',
        caseInsensitive: true
      },
      {
        token: 'keyword.count',
        regex: /count\s*/,
        push: 'count',
        caseInsensitive: true
      },
      {
        token: [
          'keyword.function.nice_function',
          'paren.lparen.function_arguments',
          'text.function_arguments',
          'paren.rparen',
          'text.whitespace'
        ],
        regex: `((?:${functions.join('|')})\\s*)(\\()(.*?)(\\))($|\\s+)`,
        caseInsensitive: true
      },
      {
        token: 'keyword.other.chaining',
        regex: /\./
      },
      {
        token: 'support.function.field',
        regex: /([a-z_]+)($|\s+)/,
        push: 'comparison'
      }
    ]

    const customRules = {
      start: [
        {
          token: 'keyword.find',
          regex: /find($|\s+)/,
          next: 'model',
          caseInsensitive: true
        },
        {
          token: 'keyword.where',
          regex: /where($|\s+)/,
          next: 'rootwhere',
          caseInsensitive: true
        }
      ],
      model: [
        {
          token: 'support.class.model',
          regex: /[A-Z][a-z_0-9]*\s*/,
          next: 'pop'
        }
      ],
      rootwhere: [
        {
          token: 'keyword.order_by',
          regex: /order by($|\s+)/,
          next: 'order',
          caseInsensitive: true
        },
        ...commonWhere
      ],
      comparison: [
        {
          token: 'keyword.operator.comparison',
          regex: `(${operators.join('|')})\\s*`,
          next: 'value'
        }
      ],
      value: [
        {
          token: 'string',
          regex: /".*?"\s*/,
          next: 'pop'
        },
        {
          token: 'constant.numeric',
          regex: /[0-9]+(.[0-9]+)?\s*/,
          next: 'pop'
        },
        {
          token: 'constant.language.tocco_placeholder',
          regex: `\\:(${placeholders.join('|')})\\s*`,
          next: 'pop',
          caseInsensitive: true
        },
        {
          token: 'constant.language',
          regex: `(${atoms.join('|')})\\s*`,
          next: 'pop',
          caseInsensitive: true
        },
        {
          token: 'support.type',
          regex: `(${types.join('|')}):\\s*`,
          caseInsensitive: true
        }
      ],
      exists: [
        {
          token: 'paren.lparen',
          regex: /\(\s*/
        },
        {
          token: 'support.class.relation',
          regex: /rel/,
          push: 'model'
        },
        {
          token: 'keyword.other.chaining',
          regex: /\./
        },
        {
          token: 'keyword.where',
          regex: /where($|\s+)/,
          next: 'existswhere',
          caseInsensitive: true
        },
        {
          token: 'paren.rparen',
          regex: /\)\s*/,
          next: 'pop'
        }
      ],
      existswhere: [
        ...commonWhere,
        {
          token: 'paren.rparen',
          regex: /\)\s*/,
          next: 'pop'
        }
      ],
      count: [
        {
          token: 'paren.lparen',
          regex: /\(\s*/
        },
        {
          token: 'support.class.relation',
          regex: /rel/,
          push: 'model'
        },
        {
          token: 'keyword.other.chaining',
          regex: /\./
        },
        {
          token: 'keyword.where',
          regex: /where($|\s+)/,
          next: 'countwhere',
          caseInsensitive: true
        },
        {
          token: 'paren.rparen',
          regex: /\)\s*/,
          next: 'comparison'
        }
      ],
      countwhere: [
        ...commonWhere,
        {
          token: 'paren.rparen',
          regex: /\)\s*/,
          next: 'comparison'
        }
      ],
      order: [
        {
          token: 'support.class.relation',
          regex: /rel/,
          push: 'model'
        },
        {
          token: 'keyword.other.chaining',
          regex: /\./
        },
        {
          token: ['support.function.field', 'keyword.direction', 'separator'],
          regex: /([a-z_]+\s*)(asc|desc)?($|,|\s+)/
        }
      ]
    }
    this.$rules = _mergeWith(
      this.$rules,
      customRules,
      (objValue, srcValue) => _isArray(objValue) ? objValue.concat(srcValue) : undefined
    )

    this.normalizeRules()
  }
}

export default class TqlMode extends ace.require('ace/mode/text').Mode {
  constructor(loadModel) {
    super()
    this.HighlightRules = TqlHighlightRules
    this.completer = TqlAutoCompleter(loadModel)
    this.snippedIdField = null // TODO implement? TOCDEV-4499
  }
}
