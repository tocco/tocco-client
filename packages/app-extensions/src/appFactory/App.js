import PropTypes from 'prop-types'
import React, {useCallback} from 'react'
import {IntlProvider} from 'react-intl-redux/lib'
import {Provider} from 'react-redux'
import styled from 'styled-components'
import {LoadMask} from 'tocco-ui'

import keyDown from '../keyDown'
import ThemeWrapper from './ThemeWrapper'
import './styles.css'
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const App = ({store, initIntlPromise, content, theme}) => {
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

  return (
    <ThemeWrapper appTheme={theme}>
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
  theme: PropTypes.object
}

export default App
