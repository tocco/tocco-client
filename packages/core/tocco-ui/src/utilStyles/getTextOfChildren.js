import React from 'react'

const getTextOfChildren = children => {
  let output = ''
  React.Children.map(children, (child, i) => {
    if (typeof child === 'string') {
      output = `${output}${child}`
    } else if (typeof child === 'object') {
      output = `${output}${getTextOfChildren(child.props.children)}`
    }
  })
  return output
}

export default getTextOfChildren
