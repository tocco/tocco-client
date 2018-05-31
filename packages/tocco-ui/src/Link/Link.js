import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import StyledLink from './StyledLink'
import {stylingPosition} from '../utilStyles'

/**
 * Use <Link> for internal and external links in running text.
 */
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
   * Describe link target in detail for screen readers and web crawlers.
   */
  alt: PropTypes.string,
  /**
   * Indicate download by attribute. Add string to suggest filename.
   */
  download: PropTypes.string,
  /**
   * Specify any valid URL or a contact including prefix like "mailto:". Default is '#'
   */
  href: PropTypes.string.isRequired,
  /**
   * Display an icon alongside link label. It is possible to omit label text if a icon is chosen. Utilize
   * Glyphicon of Bootstrap 3.7 or Font Awesome 4.7 by setting specific classname (e.g. "bars")
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string,
  /**
   * Describe link target concise. Default is ''.
   */
  label: PropTypes.node,
  /*
   * Define browsing context. Default value is '_self'. Possible values: _self|_blank
   */
  target: PropTypes.oneOf(['_self', '_blank']),
  /**
   * Describe link target in detail to instruct users. It is shown as popover on mouse over.
   */
  title: PropTypes.string
}

export default Link
