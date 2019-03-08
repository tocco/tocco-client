import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import StyledLink from './StyledLink'
import {design} from '../utilStyles'

/**
 * Use <Link> for internal and external links in running text.
 */
const Link = props => {
  return (
    <StyledLink
      alt={props.alt}
      breakWords={props.breakWords}
      download={props.download}
      href={props.href}
      neutral={props.neutral}
      onClick={props.onClick}
      rel={props.rel}
      tabIndex={props.tabIndex}
      target={props.target}
      title={props.title || (props.breakWords ? undefined : props.label)}
    >
      {props.icon && <Icon icon={props.icon} position={design.position.PREPEND}/>}
      {props.label}
    </StyledLink>
  )
}

Link.defaultProps = {
  breakWords: true,
  href: '#',
  target: '_self'
}

Link.propTypes = {
  /**
   * Describe link target in detail for screen readers and web crawlers.
   */
  alt: PropTypes.string,
  /**
   * If true label break with hyphens. If false label is forced into a single truncated line.
   */
  breakWords: PropTypes.bool,
  /**
   * Indicate download by attribute. Add string to suggest filename.
   */
  download: PropTypes.string,
  /**
   * Specify any valid URL or a contact including prefix like "mailto:". Default is '#'
   */
  href: PropTypes.string.isRequired,
  /**
   * Display an icon alongside link label. It is possible to omit label text if a icon is chosen. Utilize free
   * Font Awesome 5.1 icons by setting specific classname (e.g. "check").
   * https://fontawesome.com/icons?d=gallery&s=regular,solid&m=free
   */
  icon: PropTypes.string,
  /**
   * Describe link target concise.
   */
  label: PropTypes.node,
  /**
   * Links are colorized to stand out from text. Set neutral to prevent that (e.g. if background is colorized).
   */
  neutral: PropTypes.bool,
  /**
   * Function that will be triggered on click event.
   */
  onClick: PropTypes.func,
  /**
   * Define HTML rel attribute.
   */
  rel: PropTypes.string,
  /**
   * Define HTML tabindex attribute.
   */
  tabIndex: PropTypes.number,
  /*
   * Define HTML target attribute. Default value is '_self'. Possible values: _self|_blank
   */
  target: PropTypes.oneOf(['_self', '_blank']),
  /**
   * Describe link target in detail to instruct users. It is shown as popover on mouse over.
   */
  title: PropTypes.string
}

export default Link
