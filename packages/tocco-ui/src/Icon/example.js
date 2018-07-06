/* eslint no-console: 0 */
import React from 'react'
import Icon from './'
// real-import:import {Icon} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      Glyphicon<Icon
        icon="glyphicon-ok"
      />,
      Font Awesome Spin<Icon
        animation="spin"
        icon="fa-spinner"
        position="append"
      />,
      Font Awesome After<Icon
        icon="fa-check-square-o"
        position="append"
      />,
      <Icon
        icon="fa-check-square-o"
        position="prepend"
      />Font Awesome Before,
      Font Awesome Between
      <Icon
        icon="fa-check-square-o"
        position="between"
      />
      Font Awesome Between,
      Font Awesome Between Dense
      <Icon
        dense
        icon="fa-check-square-o"
        position="between"
      />
      Font Awesome Between Dense,
      Bullet as unicode character
      <Icon
        unicode={'\u2022'}
      />
      {/* end example */}
    </div>
  )
}
