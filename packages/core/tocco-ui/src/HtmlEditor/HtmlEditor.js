import {CKEditor} from '@ckeditor/ckeditor5-react'
import PropTypes from 'prop-types'
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
        onChange={(_event, editor) => {
          const data = editor.getData()
          onChange(data)
        }}
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
