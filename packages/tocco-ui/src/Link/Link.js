import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {theme} from 'styled-system'
import Icon from '../Icon'
import {stylingPosition} from '../utilStyles'

const StyledLink = styled.a`
  && {
    color: ${theme('colors.primary.line.0')}
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${theme('colors.primary.line.1')}
    }

    &:active {
      color: ${theme('colors.primary.line.2')}
    }
  }
`

const Link = props => {
  return (
    <StyledLink
      alt={props.alt}
      download={props.download}
      href={props.href}
      target={props.target}
      title={props.title}
    >
      {props.icon && <Icon icon={props.icon} position={stylingPosition.BEFORE}/>}
      {props.label}
    </StyledLink>
  )
}

Link.defaultProps = {
  href: '#',
  target: '_self'
}

Link.propTypes = {
  /**
   * Define text for screenreaders and crawlers.
   */
  alt: PropTypes.string,
  /**
   * Indicate download by attribute. Add string to suggest filename.
   */
  download: PropTypes.string,
  /**
   * Set an Url (absolute/relative) or a contact with prefix (mailto, tel). Default is '#'
   */
  href: PropTypes.string.isRequired,
  /**
   * Add an icon to the link. Set the specific class only from
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string,
  /**
   * Visible text. Default is an empty string.
   */
  label: PropTypes.node,
  /*
   * Define browsing context. Default value is '_self'. Possible values: _self|_blank
   */
  target: PropTypes.oneOf(['_self', '_blank']),
  /**
   * Popover title to be shown on mouse over.
   */
  title: PropTypes.string
}

export default Link
