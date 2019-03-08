import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import StyledButtonLink from './StyledButtonLink'
import {design} from '../utilStyles'

/**
 * Use <ButtonLink> for internal and external links if it feels like an action
 * or links compete with actions. Choose look and ink according Material Design.
 */
const ButtonLink = props => {
  const onClickHandler = e => {
    if (props.stopPropagation) {
      e.stopPropagation()
    }
  }

  return (
    <StyledButtonLink
      alt={props.alt}
      as="a"
      dense={props.dense}
      download={props.download}
      href={props.href}
      ink={props.ink}
      look={props.look}
      melt={props.buttonGroupMelt}
      onClick={onClickHandler}
      rel={props.rel}
      tabIndex={props.tabIndex}
      target={props.target}
      title={props.title}
    >
      {props.icon && <Icon dense={props.dense} icon={props.icon} position={props.iconPosition}/>}
      {props.label}
    </StyledButtonLink>
  )
}

ButtonLink.defaultProps = {
  href: '#',
  iconPosition: design.position.PREPEND,
  ink: design.ink.BASE,
  look: design.look.FLAT,
  target: '_self'
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
   * Display an icon alongside button label. It is possible to omit label text if a icon is chosen. Utilize free
   * Font Awesome 5.1 icons by setting specific classname (e.g. "check").
   * https://fontawesome.com/icons?d=gallery&s=regular,solid&m=free
   */
  icon: PropTypes.string,
  /**
   * Prepend icon or append icon to label. Use 'sole' if label text is omitted. Default value is 'prepend'.
   */
  iconPosition: PropTypes.oneOf([design.position.PREPEND, design.position.SOLE]),
  /**
   * Specify color palette. Default value is 'base'.
   */
  ink: design.inkPropTypes,
  /**
   * Describe link target concise. Default is ''.
   */
  label: PropTypes.node,
  /**
   * Look of link according Material Design (button section). Default value is 'flat'.
   */
  look: PropTypes.oneOf([
    design.look.BALL,
    design.look.FLAT,
    design.look.RAISED
  ]),
  /**
   * Define HTML rel attribute.
   */
  rel: PropTypes.string,
  /**
   * If true, the click event will not be propagated.
   */
  stopPropagation: PropTypes.bool,
  /**
   * Define HTML tabindex attribute.
   */
  tabIndex: PropTypes.number,
  /**
   * Define HTML target attribute. Default value is '_self'. Possible values: _self|_blank
   */
  target: PropTypes.oneOf(['_blank', '_self']),
  /**
   * Describe link target in detail to instruct users. It is shown as popover on mouse over.
   */
  title: PropTypes.string
}

export default ButtonLink
