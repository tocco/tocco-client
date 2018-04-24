import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import {StyledButton} from '../Button'
import {stylingInk, stylingLook, stylingPosition} from '../utilStyles'

export const StyledButtonLink = StyledButton.withComponent('a').extend`
  && {
    :hover,
    :focus {
      text-decoration: none;
    }
  }
`

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
  iconPosition: stylingPosition.BEFORE,
  ink: stylingInk.BASE,
  look: stylingLook.FLAT
}

ButtonLink.propTypes = {
  /**
   * Define text for screenreaders and crawlers.
   */
  alt: PropTypes.string,
  /**
   * May passed from ButtonGroup to merge buttons visually.
   */
  buttonGroupMelt: PropTypes.bool,
  /**
   * If true, compress button to occupy less space.
   */
  dense: PropTypes.bool,
  /**
   * Indicate download by attribute. Add string to suggest filename.
   */
  download: PropTypes.string,
  /**
   * Set an Url (absolute/relative) or a contact with prefix (mailto, tel). Default is '#'
   */
  href: PropTypes.string,
  /**
   * Add an icon to the link. Set the specific class only from
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string,
  /**
   * Add spacing according position. Default value is 'before'. Possible values: before|solely
   */
  iconPosition: PropTypes.oneOf([stylingPosition.BEFORE, stylingPosition.SOLELY]),
  /**
   * Define color palette. Default value is 'base'. Possible values: base|primary
   */
  ink: PropTypes.oneOf([stylingInk.BASE, stylingInk.PRIMARY]),
  /**
   * Visible text. Default is an empty string.
   */
  label: PropTypes.node,
  /**
   * Button Link style. Default value is 'plain'. Possible values: plain|flat|raised
   */
  look: PropTypes.oneOf([stylingLook.PLAIN, stylingLook.FLAT, stylingLook.RAISED]),
  /**
   * Popover title to be shown on mouse over.
   */
  title: PropTypes.string
}

export default ButtonLink
