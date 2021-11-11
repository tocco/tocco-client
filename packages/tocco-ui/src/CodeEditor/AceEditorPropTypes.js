import PropTypes from 'prop-types'

const AceEditorPropTypes = {
  /**
   * the language mode to start the editor in
   */
  mode: PropTypes.string.isRequired,
  /**
   * the theme to use for the editor, defaults to textmate
   * be sure to import the theme
   */
  theme: PropTypes.string,
  /**
   * the code to display
   */
  value: PropTypes.string.isRequired,
  /**
   * function that gets called whenever the value changes
   */
  onChange: PropTypes.func.isRequired,
  /**
   * whether to show the sidebar with line numbers, defaults to true
   */
  showGutter: PropTypes.bool,
  /**
   * Each of these entries gets passed to the editor. All options as defined in
   * https://github.com/ajaxorg/ace/wiki/Configuring-Ace can be used. When using an option that might be useful in
   * the future, do consider adding it here to make it easier to find.
   */
  editorOptions: PropTypes.shape({
    /**
     * the minimal amount of lines to display
     */
    minLines: PropTypes.number,
    /**
     * the maximal amount of lines to display, editors scales infinitely when not set
     */
    maxLines: PropTypes.number,
    /**
     * enable auto complete
     */
    enableBasicAutocompletion: PropTypes.bool,
    /**
     * enable auto complete while typing
     */
    enableLiveAutocompletion: PropTypes.bool,
    /**
     * enable the usage of snippets
     */
    enableSnippets: PropTypes.bool,
    /**
     * whether to display the editor in redonly mode
     */
    readOnly: PropTypes.bool
  }),
  /**
   * used to load paths for TQL autocompletion
   */
  loadModel: PropTypes.func.isRequired
}

export default AceEditorPropTypes
