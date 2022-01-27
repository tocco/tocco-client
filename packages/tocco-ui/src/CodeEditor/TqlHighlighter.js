import ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/src-min-noconflict/mode-text'
import _isArray from 'lodash/isArray'
import _mergeWith from 'lodash/mergeWith'

import {atoms, functions, operators, placeholders, types} from './TqlConstants'

export default implicitModel =>
  class TqlHighlightRules extends ace.require('ace/mode/text_highlight_rules').TextHighlightRules {
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
        start: implicitModel ? [
          {
            token: 'keyword.where',
            regex: /\s*/,
            next: 'rootwhere',
            caseInsensitive: true
          }
        ] : [
          {
            token: 'keyword.find',
            regex: /find($|\s+)/,
            push: 'model',
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
            regex: /\d+(.\d+)?\s*/,
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
      this.$rules = _mergeWith(this.$rules, customRules, (objValue, srcValue) =>
        _isArray(objValue) ? objValue.concat(srcValue) : undefined
      )

      this.normalizeRules()
    }
  }
