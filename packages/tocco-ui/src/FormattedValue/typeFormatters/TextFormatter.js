import React from 'react'

const TextFormatter = props => {
  let content = props.value || ''

  return (
    <span>
      {
        content.split('\\n').map((b, idx) => (
          <div key={idx}>{b}</div>
        ))
      }
    </span>
  )
}

TextFormatter.propTypes = {
  value: React.PropTypes.node
}

export default TextFormatter
