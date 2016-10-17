import React from 'react'
import ReactDOM from 'react-dom'

import './styles/core.scss'

import {loginFactory, passwordUpdateFactory} from './appFactory'

if (__DEV__) {
  const mountElement = document.getElementById('root')

  let render = () => {
    const component = loginFactory()
    // const component = passwordUpdateFactory()
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
