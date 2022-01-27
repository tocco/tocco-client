import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import CodeEditor from '../../CodeEditor'

const EditorWrapper = styled.div`
  margin-top: 5px;
`

const CodeEdit = ({value, onChange, immutable, options}) => (
  <EditorWrapper>
    <CodeEditor
      value={value}
      onChange={onChange}
      mode={options.mode}
      theme={'textmate'}
      showGutter={true}
      editorOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        minLines: 5,
        maxLines: 50,
        readOnly: immutable
      }}
      implicitModel={options.implicitModel}
    />
  </EditorWrapper>
)

CodeEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    implicitModel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        entityModel: PropTypes.string,
        field: PropTypes.string,
        key: PropTypes.string,
      })
    ])
  })
}

export default CodeEdit
