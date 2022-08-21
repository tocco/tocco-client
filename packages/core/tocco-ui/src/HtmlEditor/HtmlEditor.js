import {CKEditor} from '@ckeditor/ckeditor5-react'
import PropTypes from 'prop-types'
import {useRef} from 'react'
import {useIntl} from 'react-intl'

import ToccoCKEditor from './CKEditor'
import {StyledHtmlEditor} from './StyledHtmlEditor'

const getCKEditorLanguageFromLocale = locale => {
  switch (locale) {
    case 'fr-CH':
      return 'fr'
    case 'it-CH':
      return 'it'
    case 'en-US':
      return 'en'
    case 'fr':
    case 'en':
    case 'it':
    case 'de':
      return locale
    case 'de-CH':
    default:
      return 'de'
  }
}

/*

Example how to remove specific toolbar buttons from the default config

```js
ckEditorConfig = {
  toolbar: {
    removeItems: ['fontColor']
  }
}
```
*/
const HtmlEditor = ({value, onChange, contentLang, ckEditorConfig}) => {
  const intl = useIntl()
  const {locale} = intl

  const sourceEditingChangeHandled = useRef(false)

  const handleChange = (_event, editor) => {
    const isSourceEditingMode = editor.plugins.get('SourceEditing').isSourceEditingMode
    if (isSourceEditingMode) {
      if (sourceEditingChangeHandled.current === true) {
        // Handle onChange only once if source editing mode is active.
        //
        // The 'SourceEditing' plugin internally updates the editor sources
        // on `editor.getData()`. This leads to an infinite loop of
        // `getData()` calls and `onChange` events (as this `onChange`
        // event handler calls `getData()`.) Therefore, we have to make
        // sure that we handle the `onChange` only once if we're in the
        // source editing mode.
        //
        // Note:
        // The `onChange` never actually gets fired during changes in the
        // source editing mode. Rather, the editor gets unmounted before the form
        // gets saved. During this procedure an internal destroy function is called
        // which updates the sources and in turn fires the `onChange` event.
        return
      }
      sourceEditingChangeHandled.current = true
    }

    const data = editor.getData()
    onChange(data)
  }

  return (
    <StyledHtmlEditor>
      <CKEditor
        editor={ToccoCKEditor}
        config={{
          language: {
            ui: getCKEditorLanguageFromLocale(locale),
            content: contentLang
          },
          ...ckEditorConfig
        }}
        data={value}
        onChange={handleChange}
      />
    </StyledHtmlEditor>
  )
}

HtmlEditor.defaultProps = {
  value: '',
  contentLang: 'de'
}

HtmlEditor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  contentLang: PropTypes.oneOf(['de', 'fr', 'it', 'en']),
  ckEditorConfig: PropTypes.object
}

export default HtmlEditor
