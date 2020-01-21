import PropTypes from 'prop-types'
import React from 'react'
import {react} from 'tocco-util'

import Link from '../../Link'
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

const UrlEdit = props =>
  <StyledEditableWrapper immutable={props.immutable}>
    <StyledUrlEdit
      disabled={props.immutable}
      id={props.id}
      immutable={props.immutable}
      name={props.name}
      onChange={e => props.onChange(normalizeUrl(e.target.value))}
      value={props.value}
    />
    {props.value && <StyledEditableControl>
      <Link
        href={props.value}
        icon="external-link"
        look="ball"
        tabIndex={-1}
        target="_blank"
        neutral
      />
    </StyledEditableControl>}
  </StyledEditableWrapper>

UrlEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default react.Debouncer(UrlEdit)
