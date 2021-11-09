import ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/src-min-noconflict/mode-ftl'
import 'ace-builds/src-min-noconflict/mode-text'
import 'ace-builds/src-min-noconflict/mode-html'

/** this is a copy from https://github.com/ajaxorg/ace/blob/master/lib/ace/mode/ftl_highlight_rules.js but with angled
 * brackets replaced with square brackets as described in
 * https://freemarker.apache.org/docs/dgui_misc_alternativesyntax.html
 *
 * TODO add auto-complete? only for tocco functions? TOCDEV-4496
 * TODO implement possibility to switch between the two and open PR with ACE repository? TOCDEV-4495
 **/
class ToccoFtlLangHighlightRules extends ace.require('ace/mode/text_highlight_rules').TextHighlightRules {
  constructor() {
    super()

    const stringBuiltIns = '\\?|substring|cap_first|uncap_first|capitalize|chop_linebreak|date|time|datetime|'
      + 'ends_with|html|groups|index_of|j_string|js_string|json_string|last_index_of|length|lower_case|'
      + 'left_pad|right_pad|contains|matches|number|replace|rtf|url|split|starts_with|string|trim|'
      + 'upper_case|word_list|xhtml|xml'
    const numberBuiltIns = 'c|round|floor|ceiling'
    const dateBuiltIns = 'iso_[a-z_]+'
    const seqBuiltIns = 'first|last|seq_contains|seq_index_of|seq_last_index_of|reverse|size|sort|sort_by|chunk'
    const hashBuiltIns = 'keys|values'
    const xmlBuiltIns = 'children|parent|root|ancestors|node_name|node_type|node_namespace'
    const expertBuiltIns = 'byte|double|float|int|long|short|number_to_date|number_to_time|number_to_datetime|'
      + 'eval|has_content|interpret|is_[a-z_]+|namespacenew'
    const allBuiltIns = stringBuiltIns + numberBuiltIns + dateBuiltIns + seqBuiltIns + hashBuiltIns
      + xmlBuiltIns + expertBuiltIns

    const deprecatedBuiltIns = 'default|exists|if_exists|web_safe'

    const variables = 'data_model|error|globals|lang|locale|locals|main|namespace|node|current_node|'
      + 'now|output_encoding|template_name|url_escaping_charset|vars|version'

    const operators = 'gt|gte|lt|lte|as|in|using'

    const reserved = 'true|false'

    const attributes = 'encoding|parse|locale|number_format|date_format|time_format|datetime_format|time_zone|'
      + 'url_escaping_charset|classic_compatible|strip_whitespace|strip_text|strict_syntax|ns_prefixes|'
      + 'attributes'

    this.$rules = {
      start: [
        {
          token: 'constant.character.entity',
          regex: /&[^;]+;/
        },
        {
          token: 'support.function',
          regex: '\\?(' + allBuiltIns + ')'
        },
        {
          token: 'support.function.deprecated',
          regex: '\\?(' + deprecatedBuiltIns + ')'
        },
        {
          token: 'language.variable',
          regex: '\\.(?:' + variables + ')'
        },
        {
          token: 'constant.language',
          regex: '\\b(' + reserved + ')\\b'
        },
        {
          token: 'keyword.operator',
          regex: '\\b(?:' + operators + ')\\b'
        },
        {
          token: 'entity.other.attribute-name',
          regex: attributes
        },
        {
          token: 'string', //
          regex: /['"]/,
          next: 'qstring'
        },
        {
          // Deal with variable names that contains number
          // e.g. <#if var42 == 42 >
          token: function(value) {
            if (value.match('^[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?$')) {
              return 'constant.numeric'
            } else {
              return 'variable'
            }
          },
          regex: /[\w.+-]+/
        },
        {
          token: 'keyword.operator',
          regex: '!|\\.|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|&&|\\|\\||\\?\\:'
            + '|\\*=|%=|\\+=|\\-=|&=|\\^='
        },
        {
          token: 'paren.lparen',
          regex: '[[({]'
        },
        {
          token: 'paren.rparen',
          regex: '[\\])}]'
        },
        {
          token: 'text',
          regex: '\\s+'
        }
      ],

      qstring: [
        {
          token: 'constant.character.escape',
          regex: '\\\\[nrtvef\\\\"$]'
        },
        {
          token: 'string',
          regex: /['"]/,
          next: 'start'
        },
        {
          defaultToken: 'string'
        }
      ]
    }
  }
}

export class ToccoFtlHighlightRules extends ace.require('ace/mode/html_highlight_rules').HtmlHighlightRules {
  constructor() {
    super()

    const directives = 'assign|attempt|break|case|compress|default|elseif|else|escape|fallback|function|flush|'
      + 'ftl|global|if|import|include|list|local|lt|macro|nested|noescape|noparse|nt|recover|recurse|return|rt|'
      + 'setting|stop|switch|t|visit'

    const startRules = [
      {
        token: 'comment',
        regex: '\\[#--',
        next: 'ftl-dcomment'
      }, {
        token: 'string.interpolated',
        regex: '\\${',
        push: 'ftl-start'
      }, {
        token: 'keyword.function',
        regex: '\\[/?#(' + directives + ')',
        push: 'ftl-start'
      }, {
        token: 'keyword.other',
        regex: '\\[/?@[a-zA-Z\\.]+',
        push: 'ftl-start'
      }
    ]

    const endRules = [
      {
        token: 'keyword',
        regex: '/?\\]',
        next: 'pop'
      },
      {
        token: 'string.interpolated',
        regex: '}',
        next: 'pop'
      }
    ]

    for (const key in this.$rules) {
      this.$rules[key].unshift.apply(this.$rules[key], startRules)
    }

    this.embedRules(ToccoFtlLangHighlightRules, 'ftl-', endRules, ['start'])

    this.addRules({
      'ftl-dcomment': [
        {
          token: 'comment',
          regex: '--\\]',
          next: 'pop'
        },
        {
          defaultToken: 'comment'
        }
      ]
    })

    this.normalizeRules()
  }
}

export default class ToccoFtlMode extends ace.require('ace/mode/ftl').Mode {
  constructor() {
    super()
    this.HighlightRules = ToccoFtlHighlightRules
  }
}
