import PropTypes from 'prop-types'
import React from 'react'

import ButtonLink from '../../ButtonLink'
import {
  StyledEditableControl,
  StyledEditableWrapper
} from '../StyledEditableValue'
import StyledUrlEdit from './StyledUrlEdit'

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
    <StyledEditableWrapper immutable={props.immutable}>
      <StyledUrlEdit
        disabled={props.immutable}
        id={props.id}
        immutable={props.immutable}
        name={props.name}
        onChange={handleChange}
        value={value}
      />
      {value && <StyledEditableControl>
        <ButtonLink
          href={value}
          icon="external-link-alt"
          iconPosition="sole"
          look="ball"
          tabIndex={-1}
          target="_blank"
        />
      </StyledEditableControl>}
    </StyledEditableWrapper>
  )
}

StringEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default StringEdit
