import React from 'react'

const wrapWithContext = (context, contextTypes, children) => {
  const wrapperWithContext = React.createClass({
    childContextTypes: contextTypes,
    getChildContext() {
      return context
    },
    render() {
      return children
    }
  })
  return React.createElement(wrapperWithContext)
}

export default wrapWithContext
