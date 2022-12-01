import PropTypes from 'prop-types'
import {useCallback} from 'react'
import {IntlProvider} from 'react-intl-redux/lib'
import {Provider} from 'react-redux'
import {ToccoTheme, WidgetTheme} from 'tocco-theme'
import {LoadMask} from 'tocco-ui'
import {env} from 'tocco-util'

import cache from '../cache'
import keyDown from '../keyDown'
import {StyledApp} from './StyledComponents'
import ThemeWrapper from './ThemeWrapperContainer'
import './styles.css'

const App = ({store, initIntlPromise, content, theme}) => {
  const getDefaultTheme = embedType => (embedType === 'widget' ? WidgetTheme : ToccoTheme)

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

  const embedType = env.getEmbedType()

  return (
    <Provider store={store}>
      <ThemeWrapper customTheme={theme} defaultTheme={getDefaultTheme(embedType)}>
        <keyDown.KeyDownWatcher>
          <LoadMask promises={[initIntlPromise]}>
            <IntlProvider>
              <cache.CacheInitLoadMask>
                <StyledApp ref={wrapperCallback}>{content}</StyledApp>
              </cache.CacheInitLoadMask>
            </IntlProvider>
          </LoadMask>
        </keyDown.KeyDownWatcher>
      </ThemeWrapper>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  initIntlPromise: PropTypes.object.isRequired,
  content: PropTypes.node.isRequired,
  theme: PropTypes.object
}

export default App
