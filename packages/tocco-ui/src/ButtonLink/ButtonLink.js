import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import {ButtonStyles} from '../Button'

export const ButtonLinkStyles = ButtonStyles.withComponent('a').extend`
  && {
    :hover,
    :focus {
      text-decoration: none;
    }
  }
`

const ButtonLink = props => {
  return (
    <ButtonLinkStyles
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
    </ButtonLinkStyles>
  )
}

ButtonLink.defaultProps = {
  href: '#',
  iconPosition: 'before',
  ink: 'base',
  look: 'flat'
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
  iconPosition: PropTypes.oneOf(['before', 'solely']),
  /**
   * Define color palette. Default value is 'base'. Possible values: base|primary
   */
  ink: PropTypes.oneOf(['base', 'primary']),
  /**
   * Visible text. Default is an empty string.
   */
  label: PropTypes.node,
  /**
   * Button Link style. Default value is 'plain'. Possible values: plain|flat|raised
   */
  look: PropTypes.oneOf(['flat', 'raised']),
  /**
   * Popover title to be shown on mouse over.
   */
  title: PropTypes.string
}

export default ButtonLink
