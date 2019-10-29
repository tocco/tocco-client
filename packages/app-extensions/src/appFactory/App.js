import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {LoadMask} from 'tocco-ui'
import {IntlProvider} from 'react-intl-redux/lib'

import ThemeWrapper from './ThemeWrapper'
import keyDown from '../keyDown'

const App = ({store, initIntlPromise, name, content, theme}) => {
  const wrapperCallback = useCallback(node => {
    if (node) {
      import(/* webpackChunkName: "fontawesome" */ '@fortawesome/fontawesome-svg-core').then(fontawesome => {
        fontawesome.dom.watch({
          autoReplaceSvgRoot: node,
          observeMutationsRoot: node
        })
      })
    }
  }, [])

  return (
    <ThemeWrapper appTheme={theme}>
      <Provider store={store}>
        <keyDown.KeyDownWatcher>
          <LoadMask promises={[initIntlPromise]}>
            <IntlProvider>
              <div className={`tocco-${name}`} ref={wrapperCallback}>
                {content}
              </div>
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
  name: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  theme: PropTypes.object
}

export default App
