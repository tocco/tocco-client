import React from 'react'
import ReactDOM from 'react-dom'
import ShowCaseApp from './components/ShowCaseApp'
import componentsTree from './uiComponentsTree'

const init = () => () => <ShowCaseApp componentsTree={componentsTree}/>

const mountElement = document.getElementById('root')

let render = () => {
  const element = React.createElement(init())
  ReactDOM.render(element, mountElement)
}

if (__DEV__ || __STANDALONE__) {
  require('tocco-theme/src/ToccoTheme/theme.scss')
  if (module.hot) {
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
  module.hot.accept()
}

if (__STANDALONE__) {
  render()
}
