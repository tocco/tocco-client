import PropTypes from 'prop-types'
import React from 'react'

import ButtonLink from '../../ButtonLink'
import StyledFormControl from './StyledFormControl'

const StringEdit = props => {
  const value = props.value || ''

  const normalizeUrl = url => {
    url = url.toLowerCase()
    if (url.indexOf('.') > 0 && !/^[a-z0-9]+:\/\//.test(url)) {
      url = `https://${url}`
    }

    return url
  }

  const handleChange = e => {
    const url = normalizeUrl(e.target.value)
    if (props.onChange) {
      props.onChange(url)
    }
  }

  return (
    <StyledFormControl readOnly={props.readOnly}>
      <input
        type="url"
        name={props.name}
        value={value}
        onChange={handleChange}
        id={props.id}
        disabled={props.readOnly}
      />
      {value && <ButtonLink
        href={value}
        icon="external-link-alt"
        iconPosition="sole"
        look="ball"
        tabIndex={-1}
        target="_blank"
      />}
    </StyledFormControl>
  )
}

StringEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default StringEdit
