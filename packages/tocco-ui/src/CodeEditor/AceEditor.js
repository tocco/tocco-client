import ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/webpack-resolver'
import {Mode as DroolsMode} from 'ace-builds/src-min-noconflict/mode-drools'
import {Mode as GroovyMode} from 'ace-builds/src-min-noconflict/mode-groovy'
import {Mode as HtmlMode} from 'ace-builds/src-min-noconflict/mode-html'
import {Mode as JsonMode} from 'ace-builds/src-min-noconflict/mode-json'
import {Mode as LessMode} from 'ace-builds/src-min-noconflict/mode-less'
import {Mode as PropertiesMode} from 'ace-builds/src-min-noconflict/mode-properties'
import {Mode as TextMode} from 'ace-builds/src-min-noconflict/mode-text'
import {Mode as XmlMode} from 'ace-builds/src-min-noconflict/mode-xml'
import _get from 'lodash/get'
import _isObject from 'lodash/isObject'
import _isString from 'lodash/isString'
import React, {useEffect, useMemo, useRef} from 'react'
import styled from 'styled-components'

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
import {extractBody, sendRequest} from './requestHelper'
import ToccoFtlMode from './ToccoFtlMode'
import TqlMode from './TqlMode'

const StyledEditor = styled.div`
  width: 100%;
  z-index: 0; /* gutter lays over menu otherwise */
`

const modeMappings = {
  groovy: () => new GroovyMode(),
  html: () => new HtmlMode(),
  xml: () => new XmlMode(),
  properties: () => new PropertiesMode(),
  json: () => new JsonMode(),
  htmlmixed: () => new ToccoFtlMode(),
  freemarkermixed: () => new ToccoFtlMode(),
  ftl: () => new ToccoFtlMode(),
  tql: props => new TqlMode(props),
  less: () => new LessMode(),
  drools: () => new DroolsMode(),
  text: () => new TextMode()
}

const getMode = (mode, props) => _get(modeMappings, mode, mode)(props)

const loadImplicitModel = implicitModel => {
  if (_isString(implicitModel)) {
    return Promise.resolve(implicitModel)
  } else if (_isObject(implicitModel)) {
    return sendRequest(`entities/2.0/${implicitModel.entityModel}/${implicitModel.key}?_paths=${implicitModel.field}`)
      .then(extractBody)
      .then(moduleEntity => _get(moduleEntity, ['paths', 'entity_name', 'value'], null))
  } else {
    return Promise.resolve(null)
  }
}

const setEditorConfiguration = (editor, {mode, theme, showGutter, editorOptions = {}, implicitModel}) => {
  loadImplicitModel(implicitModel)
    .then(implicitModelName => getMode(mode, {implicitModelName}))
    .then(editorMode => editor.getSession().setMode(editorMode))
  editor.setTheme(`ace/theme/${theme}`)
  Object.entries(editorOptions).forEach(([k, v]) => {
    editor.setOption(k, v)
  })
  editor.renderer.setShowGutter(showGutter)
  editor.resize()
}

const AceEditor = props => {
  const {mode, theme = 'textmate', value, onChange, showGutter = true, editorOptions = {}, implicitModel} = props
  const containerReference = useRef(null)
  const editorReference = useRef(null)

  const editorConfig = useMemo(() => ({mode, theme, showGutter, editorOptions, implicitModel}), [
    mode,
    theme,
    showGutter,
    editorOptions,
    implicitModel
  ])

  // only on mount
  useEffect(() => {
    const aceEditor = ace.edit(containerReference.current)
    aceEditor.getSession().setValue(value || '')
    aceEditor.on('change', () => onChange(aceEditor.getValue()))
    setEditorConfiguration(aceEditor, editorConfig)
    editorReference.current = aceEditor

    return () => aceEditor.destroy()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (editorReference.current) {
      setEditorConfiguration(editorReference.current, editorConfig)
    }
  }, [editorConfig])
  useEffect(() => {
    /* ace handles its state internally, always resetting the value confuses it.
     * this way we only set the value when it is different from the current state, i.e. when it is overwritten through
     * code. feel free to rewrite this with better ideas.
     */
    if (editorReference.current && value && value !== editorReference.current.getValue()) {
      editorReference.current.getSession().setValue(value)
    }
  }, [value])

  return <StyledEditor ref={containerReference} />
}

AceEditor.propTypes = AceEditorPropTypes

export default AceEditor
