import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import {design} from '../utilStyles'
import StyledRouterLinkButton from './StyledRouterLinkButton'

const RouterLinkButton = React.forwardRef((props, ref) => {
  const {aria, icon, ink, label, iconOnly, children} = props
  return (
    <StyledRouterLinkButton
      ref={ref}
      {...aria}
      {...props}
      ink={ink || design.ink.BASE}
      data-cy={props['data-cy']}
      title={label}
    >
      {icon && <Icon icon={icon} />}
      {!iconOnly && label ? <span>{label}</span> : children || '\u200B'}
    </StyledRouterLinkButton>
  )
})

RouterLinkButton.propTypes = {
  /**
   * A flat object of ARIA keys and values.
   */
  aria: PropTypes.object,
  /**
   * Instead of using label prop it is possible to pass a child
   * (e.g. <LinkButton><FormattedMessage id="client.message"/></LinkButton>). This is not useful for
   * styled tags since buttons design is controlled by props ink and look and immutable.
   */
  children: PropTypes.node,
  /**
   * If true, button occupies less space. It should only used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
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
   * Describe button action in detail to instruct users. It is shown as popover on mouse over.
   */
  title: PropTypes.string,
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
  iconOnly: PropTypes.bool
}

export default RouterLinkButton
