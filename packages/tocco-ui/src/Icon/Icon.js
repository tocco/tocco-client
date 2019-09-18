import PropTypes from 'prop-types'
import React from 'react'
import {withTheme} from 'styled-components'
import _omit from 'lodash/omit'
import _get from 'lodash/get'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'

import getSpacing from './StyledIcon'
import {design} from '../utilStyles'

// Load Libraries
(() => {
  library.add(fab)
  library.add(far)
  library.add(fas)
})()

/**
 * Utilize <Icon> to create additional meaning or to omit text labels. Every chosen
 * icon must be concise and convey the same meaning in all contexts. See
 * https://www.npmjs.com/package/@fortawesome/react-fontawesome for detailed feature
 * description. All free solid and regular icons are available.
 */
export class Icon extends React.Component {
  render() {
    const filteredProps = _omit(this.props, ['dense', 'position', 'theme', 'size'])

    const icon = (typeof this.props.icon === 'string' && this.props.icon.includes(','))
      ? this.props.icon.replace(/\s+/, '').split(',')
      : this.props.icon

    return <FontAwesomeIcon
      {...filteredProps}
      icon={icon}
      style={{...this.props.style, ...(getSpacing(this.props))}}
      {..._get(this.props, 'style.color') && {color: this.props.style.color}}
    />
  }
}

Icon.defaultProps = {
  position: design.position.SOLE
}

Icon.propTypes = {
  /**
   * Accepts a valid fontawesome class names as string. Fontawesome prefix can be added first separated by comma.
   * Available icons:
   * https://fontawesome.com/icons?d=gallery&s=brands,regular,solid&m=free
   */
  icon: PropTypes.string.isRequired,
  /**
   * If true, button occupies less space. It should only be used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
  /**
   * Specify if icon is positioned next to text or not, to control spacing. Default value is 'prepend'.
   */
  position: design.positionPropTypes,
  /**
   * Callback that gets invoked when component is fully loaded.
   */
  onLoaded: PropTypes.func,
  /**
   * CSS Styles object. Color property can be used to coloize the icon.
   */
  style: PropTypes.objectOf(PropTypes.string)
}

export default withTheme(Icon)
