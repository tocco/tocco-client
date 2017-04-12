import React from 'react'

const wrapWithContext = (context, contextTypes, children) => {
  class WrapperWithContext extends React.Component {
    getChildContext = () => context
    render = () => children
  }
  WrapperWithContext.childContextTypes = contextTypes

  return React.createElement(WrapperWithContext)
}

export default wrapWithContext
