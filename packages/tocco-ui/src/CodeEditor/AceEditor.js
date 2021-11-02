import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import ace from 'ace-builds/src-min-noconflict/ace'
import {Mode as FtlMode} from 'ace-builds/src-min-noconflict/mode-ftl'
import {Mode as GroovyMode} from 'ace-builds/src-min-noconflict/mode-groovy'
import {Mode as HtmlMode} from 'ace-builds/src-min-noconflict/mode-html'
import {Mode as LessMode} from 'ace-builds/src-min-noconflict/mode-less'
import {Mode as XmlMode} from 'ace-builds/src-min-noconflict/mode-xml'
import {Mode as PropertiesMode} from 'ace-builds/src-min-noconflict/mode-properties'
import {Mode as DroolsMode} from 'ace-builds/src-min-noconflict/mode-drools'
import {Mode as JsonMode} from 'ace-builds/src-min-noconflict/mode-json'
import {Mode as TextMode} from 'ace-builds/src-min-noconflict/mode-text'

import AceEditorPropTypes from './AceEditorPropTypes'
import 'ace-builds/src-min-noconflict/snippets/ftl'
import 'ace-builds/src-min-noconflict/snippets/groovy'
import 'ace-builds/src-min-noconflict/snippets/html'
import 'ace-builds/src-min-noconflict/snippets/less'
import 'ace-builds/src-min-noconflict/snippets/xml'
import 'ace-builds/src-min-noconflict/snippets/properties'
import 'ace-builds/src-min-noconflict/snippets/json'
import 'ace-builds/src-min-noconflict/snippets/drools'
import 'ace-builds/src-min-noconflict/theme-textmate'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import TqlMode from './TqlMode'

const StyledEditor = styled.div`
  width: 100%;
  z-index: 0; /* gutter lays over menu otherwise */
`

const modeMappings = {
  groovy: new GroovyMode(),
  html: new HtmlMode(),
  xml: new XmlMode(),
  properties: new PropertiesMode(),
  json: new JsonMode(),
  htmlmixed: new FtlMode(),
  freemarkermixed: new FtlMode(),
  ftl: new FtlMode(),
  tql: new TqlMode(),
  less: new LessMode(),
  drools: new DroolsMode(),
  text: new TextMode()
}

const getMode = mode => _get(modeMappings, mode, mode)

const AceEditor = ({
  mode,
  theme = 'textmate',
  value,
  onChange,
  editorOptions = {}
}) => {
  const [reference, setReference] = useState(null)
  useEffect(() => {
    if (reference) {
      const aceEditor = ace.edit(reference)
      aceEditor.getSession().setMode(getMode(mode))
      aceEditor.getSession().setValue(value)
      aceEditor.setTheme(`ace/theme/${theme}`)
      aceEditor.renderer.setShowGutter(true)
      aceEditor.on('change', () => onChange(aceEditor.getValue()))

      if (editorOptions) {
        Object.entries(editorOptions).forEach(([k, v]) => {
          aceEditor.setOption(k, v)
        })
      }

      aceEditor.resize()

      return () => aceEditor.destroy()
    }
  }, [reference])
  return <StyledEditor ref={setReference}/>
}

AceEditor.propTypes = AceEditorPropTypes

export default AceEditor
