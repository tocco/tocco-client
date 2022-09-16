import {render} from '@testing-library/react'
import PropTypes from 'prop-types'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'

import TestThemeProvider from '../TestThemeProvider'

const defaultLocale = 'en'
const locale = defaultLocale

const IntlProviderWrapper = ({children}) => {
  const ignoreError = () => {}
  return (
    <IntlProvider onError={ignoreError} locale={locale} defaultLocale={defaultLocale}>
      <TestThemeProvider>{children}</TestThemeProvider>
    </IntlProvider>
  )
}
IntlProviderWrapper.propTypes = {
  children: PropTypes.any
}
const renderWithIntl = (ui, options) => render(ui, {wrapper: IntlProviderWrapper, ...options})

const ReduxProviderWrapper = ({store, children}) => (
  <Provider store={store}>
    <IntlProviderWrapper>{children}</IntlProviderWrapper>
  </Provider>
)

ReduxProviderWrapper.propTypes = {
  store: PropTypes.any,
  children: PropTypes.any
}

const renderWithStore = (ui, {store, ...renderOptions} = {}) => {
  const Wrapper = ({children}) => {
    return <ReduxProviderWrapper store={store}>{children}</ReduxProviderWrapper>
  }
  Wrapper.propTypes = {
    children: PropTypes.any
  }

  // Return an object with the store and all of RTL's query functions
  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}

export {renderWithIntl, renderWithStore}
