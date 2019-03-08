import PropTypes from 'prop-types'
import React from 'react'
import {withTheme} from 'styled-components'

import getSpacing from './StyledIcon'
import {design} from '../utilStyles'
import lazyComponent from '../util/lazyComponent'

/**
 * Utilize <Icon> to create additional meaning or to omit text labels. Every chosen
 * icon must be concise and convey the same meaning in all contexts. See
 * https://www.npmjs.com/package/@fortawesome/react-fontawesome for detailed feature
 * description. All free solid and regular icons are available.
 */
export class Icon extends React.Component {
  lazyFontAwesomeIcon = null

  constructor(props) {
    super(props)

    const fontLib = props.icon.includes('fab')
      ? {
        import: import(/* webpackChunkName: "fontawesomeicon-brands" */ '@fortawesome/free-brands-svg-icons'),
        module: 'fab'
      }
      : props.icon.includes('far')
        ? {
          import: import(/* webpackChunkName: "fontawesomeicon-regular" */ '@fortawesome/free-regular-svg-icons'),
          module: 'far'
        }
        : {
          import: import(/* webpackChunkName: "fontawesomeicon-solid" */ '@fortawesome/free-solid-svg-icons'),
          module: 'fas'
        }

    const loadComponent = Promise.all([
      import(/* webpackChunkName: "fontawesomeicon" */ '@fortawesome/react-fontawesome'),
      import(/* webpackChunkName: "fontawesomeicon" */ '@fortawesome/fontawesome-svg-core'),
      fontLib.import
    ]).then(response => {
      response[1].library.add(response[2][fontLib.module])
      return response
    })

    this.lazyFontAwesomeIcon = lazyComponent(() => loadComponent, '[0].FontAwesomeIcon', <i/>, () => {
      if (this.props.onLoaded) {
        this.props.onLoaded()
      }
    })
  }

  render() {
    const icon = (typeof this.props.icon === 'string' && this.props.icon.includes(','))
      ? this.props.icon.replace(/\s+/, '').split(',')
      : this.props.icon

    return <this.lazyFontAwesomeIcon
      {...this.props}
      icon={icon}
      style={{...this.props.style, ...(getSpacing(this.props))}}
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
   * If true, button occupies less space. It should only used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
  /**
   * Specify if icon is positioned next to text or not to control spacing. Default value is 'prepend'.
   */
  position: design.positionPropTypes,
  /**
   * Callback that gets invoked when component is fully loaded.
   */
  onLoaded: PropTypes.func,
  /**
   * CSS Styles object.
   */
  style: PropTypes.objectOf(PropTypes.string)
}

export default withTheme(Icon)
