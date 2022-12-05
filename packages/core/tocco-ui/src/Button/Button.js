import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import LoadingSpinner from '../LoadingSpinner'
import {design} from '../utilStyles'
import {useButtonContext} from './ButtonContext'
import StyledButton, {StyledLabelWrapper} from './StyledButton'

/**
 * Use the Button to trigger any actions. Choose look and ink according Material Design.
 */
const Button = React.forwardRef((props, ref) => {
  const {aria, ink, label, icon, pending, look, iconPosition, iconOnly, children} = props

  const {labelVisibility} = useButtonContext()

  return (
    <StyledButton
      ref={ref}
      {...aria}
      {...props}
      ink={ink || design.ink.BASE}
      data-cy={props['data-cy']}
      title={label}
      labelVisibility={labelVisibility}
    >
      {icon && !pending && <Icon icon={icon} />}
      {pending && <LoadingSpinner ink={ink || design.ink.BASE} look={look} position={iconPosition} size="1em" />}
      {!iconOnly && label ? <StyledLabelWrapper>{label}</StyledLabelWrapper> : children || '\u200B'}
    </StyledButton>
  )
})

Button.defaultProps = {
  iconPosition: design.position.PREPEND,
  look: design.look.FLAT,
  type: 'button'
}

Button.propTypes = {
  /**
   * A flat object of ARIA keys and values.
   */
  aria: PropTypes.object,
  /**
   * Instead of using label prop it is possible to pass a child
   * (e.g. <Button><FormattedMessage id="client.message"/></Button>). This is not useful for
   * styled tags since buttons design is controlled by props ink and look and immutable.
   */
  children: PropTypes.node,
  /**
   * If true, button occupies less space. It should only used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
  /**
   * If true, the button can not be triggered. Disable a button rather than hide it temporarily.
   */
  disabled: PropTypes.bool,
  /**
   * Display an icon alongside button label. It is possible to omit label text if an icon is chosen.
   * See Icon component for more information.
   */
  icon: PropTypes.string,
  /**
   * Prepend icon or append icon to label. Default value is 'prepend'.
   * Possible values: append|prepend
   */
  iconPosition: PropTypes.oneOf([design.position.APPEND, design.position.PREPEND]),
  /**
   * Specify color palette. Default value is 'base'.
   */
  ink: design.inkPropTypes,
  /**
   * Describe button action concise. Default is ''.
   */
  label: PropTypes.node,
  /**
   * Look of button. Default value is 'flat'.
   */
  look: PropTypes.oneOf([design.look.BALL, design.look.FLAT, design.look.RAISED]),
  /**
   * Function that will be triggered on click event.
   */
  onClick: PropTypes.func,
  /**
   * If true, an animated spinner icon is prepended.
   */
  pending: PropTypes.bool,
  /**
   * Describe button action in detail to instruct users. It is shown as popover on mouse over.
   */
  title: PropTypes.string,
  /**
   * HTML Button type. Default is 'button'.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * Tabindex indicates if the button can be focused and if/where it participates
   * in sequential keyboard navigation.
   */
  tabIndex: PropTypes.number,
  /**
   * cypress selector string
   */
  'data-cy': PropTypes.string,
  /**
   * If true, leaves the background of the button transparent and does not add any hove effect.
   */
  withoutBackground: PropTypes.bool,
  /**
   * If true, renders only the icon and minimal space around it
   */
  iconOnly: PropTypes.bool,
  /**
   * If true, removes all padding
   */
  removePadding: PropTypes.bool
}

export default Button
