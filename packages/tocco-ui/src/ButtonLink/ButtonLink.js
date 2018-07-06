import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import StyledButtonLink from './StyledButtonLink'
import {
  inkPropTypes,
  lookPropTypes,
  stylingInk,
  stylingLook,
  stylingPosition
} from '../utilStyles'

/**
 * Use <ButtonLink> for internal and external links if it feels like an action
 * or links compete with actions. Choose look and ink according Material Design.
 */
const ButtonLink = props => {
  return (
    <StyledButtonLink
      alt={props.alt}
      dense={props.dense}
      download={props.download}
      href={props.href}
      ink={props.ink}
      look={props.look}
      melt={props.buttonGroupMelt}
      title={props.title}
    >
      {props.icon && <Icon dense={props.dense} icon={props.icon} position={props.iconPosition}/>}
      {props.label}
    </StyledButtonLink>
  )
}

ButtonLink.defaultProps = {
  href: '#',
  iconPosition: stylingPosition.PREPEND,
  ink: stylingInk.BASE,
  look: stylingLook.FLAT
}

ButtonLink.propTypes = {
  /**
   * Describe link target in detail for screen readers and web crawlers.
   */
  alt: PropTypes.string,
  /**
   * May be passed from <ButtonGroup> to morph links into a split button. Do not set manually.
   */
  buttonGroupMelt: PropTypes.bool,
  /**
   * If true, links occupies less space. It should only used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
  /**
   * Specify "download" to force direct download or an arbitrary string to suggest a filename.
   */
  download: PropTypes.string,
  /**
   * Specify any valid URL or a contact including prefix like "mailto:". Default is '#'
   */
  href: PropTypes.string,
  /**
   * Display an icon alongside link label. It is possible to omit label text if a icon is chosen. Utilize
   * Glyphicon of Bootstrap 3.7 or Font Awesome 4.7 by setting specific classname (e.g. "bars")
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string,
  /**
   * Prepend icon or append icon to label. Use 'sole' if label text is omitted. Default value is 'prepend'.
   */
  iconPosition: PropTypes.oneOf([stylingPosition.PREPEND, stylingPosition.SOLE]),
  /**
   * Specify color palette. Default value is 'base'.
   */
  ink: inkPropTypes,
  /**
   * Describe link target concise. Default is ''.
   */
  label: PropTypes.node,
  /**
   * Look of link according Material Design (button section). Default value is 'flat'.
   */
  look: lookPropTypes,
  /**
   * Describe link target in detail to instruct users. It is shown as popover on mouse over.
   */
  title: PropTypes.string
}

export default ButtonLink
