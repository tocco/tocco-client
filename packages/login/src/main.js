import React from 'react'
import ReactDOM from 'react-dom'

import {loginFactory, passwordUpdateFactory} from './appFactory'

if (__DEV__) {
  require('tocco-theme/src/ToccoTheme/theme.scss')

  const fetchMock = require('fetch-mock')
  const setupFetchMocks = require('./dev/fetchMocks')
  setupFetchMocks(fetchMock)

  const mountElement = document.getElementById('root')

  let render = () => {
    let input
    let component

    const passwordUpdate = false
    if (passwordUpdate) {
      input = require('./dev/password_update_input.json')
      component = passwordUpdateFactory('', input)
    } else {
      input = require('./dev/login_input.json')
      component = loginFactory('', input)
    }

    const element = React.createElement(component.renderComponent)
    ReactDOM.render(element, mountElement)
  }

  if (__DEV__ && module.hot) {
    const renderApp = render
    const renderError = error => {
      const RedBox = require('redbox-react')

      ReactDOM.render(<RedBox error={error}/>, mountElement)
    }
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }
  }
  render()
} else {
  if (window.reactRegistry) {
    window.reactRegistry.register('login', loginFactory) // TODO: replace string with var
    window.reactRegistry.register('password-update', passwordUpdateFactory)
  }
}
