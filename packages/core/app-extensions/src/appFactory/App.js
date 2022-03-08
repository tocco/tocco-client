import PropTypes from 'prop-types'
import React, {useCallback} from 'react'
import {IntlProvider} from 'react-intl-redux/lib'
import {Provider} from 'react-redux'
import {ToccoTheme, WidgetTheme} from 'tocco-theme'
import {LoadMask} from 'tocco-ui'

import keyDown from '../keyDown'
import {StyledApp} from './StyledComponents'
import ThemeWrapper from './ThemeWrapper'
import './styles.css'

const App = ({store, initIntlPromise, content, theme, themeType}) => {
  const wrapperCallback = useCallback(node => {
    if (node) {
      import(/* webpackChunkName: "vendor-fontawesome" */ '@fortawesome/fontawesome-svg-core').then(fontawesome => {
        fontawesome.dom.watch({
          autoReplaceSvgRoot: node,
          observeMutationsRoot: node
        })
      })
    }
  }, [])

  const getDefaultTheme = themeType => (themeType === 'WIDGET' ? WidgetTheme : ToccoTheme)

  return (
    <ThemeWrapper customTheme={theme} defaultTheme={getDefaultTheme(themeType)}>
      <Provider store={store}>
        <keyDown.KeyDownWatcher>
          <LoadMask promises={[initIntlPromise]}>
            <IntlProvider>
              <StyledApp ref={wrapperCallback}>{content}</StyledApp>
            </IntlProvider>
          </LoadMask>
        </keyDown.KeyDownWatcher>
      </Provider>
    </ThemeWrapper>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  initIntlPromise: PropTypes.object.isRequired,
  content: PropTypes.node.isRequired,
  theme: PropTypes.object,
  themeType: PropTypes.oneOf(['WIDGET', 'ADMIN'])
}

export default App
