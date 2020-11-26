import React from 'react'
import PropTypes from 'prop-types'

import mapping from './mapping'
import FontAwesomeAdapter from './FontAwesomeAdapter'
import ToccoIcons from './ToccoIcons'

const iconLibsFactories = {
  fa: (iconMap, props) => <FontAwesomeAdapter {...props} icon={iconMap.id}/>,
  toc: (iconMap, props) => <ToccoIcons {...props} icon={iconMap.id}/>
}

export const Icon = props => {
  const iconMap = mapping[props.icon]

  if (!iconMap) {
    return null
  }

  const iconFactory = iconLibsFactories[iconMap.lib]
  return iconFactory ? iconFactory(iconMap, props) : null
}

Icon.propTypes = {
  /**
   * id of icon. Full list can be found in mapping.json file or showcase deployment.
   */
  icon: PropTypes.string.isRequired,
  /**
   * CSS Styles object. Color property can be used to colorize the icon and fontSize for the size.
   */
  style: PropTypes.objectOf(PropTypes.string)
}

export default Icon
