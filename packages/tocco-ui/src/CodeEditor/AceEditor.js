import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/webpack-resolver'
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
import ToccoFtlMode from './ToccoFtlMode'

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
  htmlmixed: new ToccoFtlMode(),
  freemarkermixed: new ToccoFtlMode(),
  ftl: new ToccoFtlMode(),
  less: new LessMode(),
  drools: new DroolsMode(),
  text: new TextMode()
}

const setupTqlMode = loadModel => {
  modeMappings.tql = new TqlMode(loadModel)
}

const getMode = mode => _get(modeMappings, mode, mode)

const setEditorConfiguration = (editor, {
  mode,
  theme,
  showGutter,
  editorOptions = {}
}) => {
  editor.getSession().setMode(getMode(mode))
  editor.setTheme(`ace/theme/${theme}`)
  Object.entries(editorOptions).forEach(([k, v]) => {
    editor.setOption(k, v)
  })
  editor.renderer.setShowGutter(showGutter)
  editor.resize()
}

const AceEditor = props => {
  const {
    mode,
    theme = 'textmate',
    value,
    onChange,
    showGutter = true,
    editorOptions = {},
    loadModel
  } = props
  const containerReference = useRef(null)
  const editorReference = useRef(null)

  useEffect(() => setupTqlMode(loadModel), [])

  useEffect(() => {
    const aceEditor = ace.edit(containerReference.current)
    aceEditor.getSession().setValue(value)
    aceEditor.on('change', () => onChange(aceEditor.getValue()))
    setEditorConfiguration(aceEditor, props)
    editorReference.current = aceEditor

    return () => aceEditor.destroy()
  }, [])
  useEffect(() => {
    if (editorReference.current) {
      setEditorConfiguration(editorReference.current, props)
    }
  }, [mode, theme, showGutter, editorOptions])
  return <StyledEditor ref={containerReference}/>
}

AceEditor.propTypes = AceEditorPropTypes

export default AceEditor
