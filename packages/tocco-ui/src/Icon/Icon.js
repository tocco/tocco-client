import PropTypes from 'prop-types'
import React from 'react'
import {withTheme} from 'styled-components'
import _omit from 'lodash/omit'

import getSpacing from './StyledIcon'
import {
  positionPropTypes,
  stylingPosition
} from '../utilStyles'

/**
 * Utilize <Icon> to create additional meaning or to omit text labels. Every chosen
 * icon must be concise and convey the same meaning in all contexts. See
 * https://www.npmjs.com/package/@fortawesome/react-fontawesome for detailed feature
 * description. All free solid and regular icons are available.
 */
class Icon extends React.Component {
  FontAwesomeIcon = null

  constructor(props) {
    super(props)
    Promise.all([
      import(/* webpackChunkName: "fontawesomeicon" */ '@fortawesome/fontawesome-svg-core'),
      import(/* webpackChunkName: "fontawesomeicon" */ '@fortawesome/react-fontawesome'),
      import(/* webpackChunkName: "fontawesomeicon" */ '@fortawesome/free-solid-svg-icons'),
      import(/* webpackChunkName: "fontawesomeicon" */ '@fortawesome/free-regular-svg-icons')
    ]).then(response => {
      this.FontAwesomeIcon = response[1].FontAwesomeIcon
      response[0].library.add(response[2].fas, response[3].far)
      this.forceUpdate()
    })
  }

  render() {
    const filteredProps = _omit(this.props, ['dense', 'position'])
    if (this.FontAwesomeIcon !== null) {
      return <this.FontAwesomeIcon {...filteredProps} style={getSpacing(this.props)}/>
    } else {
      return <i/>
    }
  }
}

Icon.defaultProps = {
  position: stylingPosition.SOLE
}

Icon.propTypes = {
  /**
   * If true, button occupies less space. It should only used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
  /**
   * Specify if icon is positioned next to text or not to control spacing. Default value is 'prepend'.
   */
  position: positionPropTypes
}

export default withTheme(Icon)
