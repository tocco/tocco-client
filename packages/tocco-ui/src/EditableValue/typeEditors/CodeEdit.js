import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import AceEditor from 'react-ace'
import _get from 'lodash/get'

import 'ace-builds/src-min-noconflict/mode-ftl'
import 'ace-builds/src-min-noconflict/mode-groovy'
import 'ace-builds/src-min-noconflict/mode-html'
import 'ace-builds/src-min-noconflict/mode-less'
import 'ace-builds/src-min-noconflict/mode-xml'
import 'ace-builds/src-min-noconflict/mode-sql'
import 'ace-builds/src-min-noconflict/mode-properties'
import 'ace-builds/src-min-noconflict/mode-drools'
import 'ace-builds/src-min-noconflict/mode-json'
import 'ace-builds/src-min-noconflict/mode-text'
import 'ace-builds/src-min-noconflict/snippets/ftl'
import 'ace-builds/src-min-noconflict/snippets/groovy'
import 'ace-builds/src-min-noconflict/snippets/html'
import 'ace-builds/src-min-noconflict/snippets/less'
import 'ace-builds/src-min-noconflict/snippets/xml'
import 'ace-builds/src-min-noconflict/snippets/sql'
import 'ace-builds/src-min-noconflict/snippets/properties'
import 'ace-builds/src-min-noconflict/snippets/json'
import 'ace-builds/src-min-noconflict/snippets/drools'
import 'ace-builds/src-min-noconflict/theme-textmate'
import 'ace-builds/src-min-noconflict/ext-language_tools'

import CustomMode from './CodeEditMode'

const StyledEditor = styled(AceEditor)`
  z-index: 0; /* gutter lays over menu otherwise */
  margin-top: 5px;
`

const modeMappings = {
  htmlmixed: 'ftl',
  tql: new CustomMode(), // TODO replace with sensible mode
  css: 'less', // TODO dumb
  mysql: 'drools', // TODO dumb
  sql: 'text' // TODO dumb
}

const getMode = ({mode}) => _get(modeMappings, mode, mode)

const CodeEdit = ({
  value,
  onChange,
  immutable,
  options
}) => <StyledEditor width={'100%'}
                    value={value}
                    onChange={onChange}
                    mode={getMode(options)}
                    theme={'textmate'}
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                    enableSnippets={true}
                    readOnly={immutable}
                    minLines={5}
                    maxLines={50}/>

CodeEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  immutable: PropTypes.bool,
  options: PropTypes.object
}

export default CodeEdit
