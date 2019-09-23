import PropTypes from 'prop-types'
import React from 'react'
import {hooks} from 'tocco-util'

import ButtonLink from '../../ButtonLink'
import {
  StyledEditableControl,
  StyledEditableWrapper
} from '../StyledEditableValue'
import StyledUrlEdit from './StyledUrlEdit'

const normalizeUrl = url => {
  url = url.toLowerCase()
  if (url.indexOf('.') > 0 && !/^[a-z0-9]+:\/\//.test(url)) {
    url = `https://${url}`
  }

  return url
}

const UrlEdit = props => {
  const [value, onChange] = hooks.useDebounce(props.value || '', props.onChange)

  return (
    <StyledEditableWrapper immutable={props.immutable}>
      <StyledUrlEdit
        disabled={props.immutable}
        id={props.id}
        immutable={props.immutable}
        name={props.name}
        onChange={e => onChange(normalizeUrl(e.target.value))}
        value={value}
      />
      {value && <StyledEditableControl>
        <ButtonLink
          href={value}
          icon="external-link-alt"
          look="ball"
          tabIndex={-1}
          target="_blank"
        />
      </StyledEditableControl>}
    </StyledEditableWrapper>
  )
}

UrlEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default UrlEdit
