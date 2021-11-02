import PropTypes from 'prop-types'
// TODO doc
const AceEditorPropTypes = {
  mode: PropTypes.string.isRequired,
  theme: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  editorOptions: PropTypes.shape({
    minLines: PropTypes.number,
    maxLines: PropTypes.number,
    enableBasicAutocompletion: PropTypes.bool,
    enableLiveAutocompletion: PropTypes.bool,
    enableSnippets: PropTypes.bool,
    readOnly: PropTypes.bool
  })
}

export default AceEditorPropTypes
