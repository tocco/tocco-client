import React from 'react'

const StringInput = props => {
  var value = props.value || ''

  var handleOnChange = (event) => {
    console.log('value', props)

    props.onChange(props.name, event.target.value)
  }

  return (
    <input type="text" value={value} onChange={handleOnChange}/>
  )
}

StringInput.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default StringInput
