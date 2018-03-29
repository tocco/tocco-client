/* eslint no-console: 0 */
import React from 'react'
import Icon from './'
// real-import:import {Button} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      Glyphicon<Icon
        icon="glyphicon-ok"
      />,
      Font Awesome Spin<Icon
        icon="fa-check-square-o"
        animation="spin"
      />,
      Font Awesome After<Icon
        icon="fa-check-square-o"
        position="after"
      />,
      <Icon
        icon="fa-check-square-o"
        position="before"
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
      Font Awesome Between Dense

      {/* end example */}
    </div>
  )
}
