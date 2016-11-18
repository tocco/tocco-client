import React from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock'

import appFactory from './appFactory'
import fetchMocks from './dev/fetchMocks'

if (__DEV__) {
  fetchMocks(fetchMock)

  const mountElement = document.getElementById('root')

  let render = () => {
    const input = require('./dev/input.json')
    let component = appFactory('', input)

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
    window.reactRegistry.register('entity-browser', appFactory) // TODO: replace string with var
  }
}
