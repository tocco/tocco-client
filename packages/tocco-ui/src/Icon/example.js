/* eslint no-console: 0 */
import React from 'react'
import Icon from './'

// real-import:import {Icon} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Icon icon="address-card" /><br />
      <Icon icon={['far', 'address-card']} /><br />
      Appended icon<Icon
        icon="user"
        position="append"
      /><br />
      <Icon
        icon="user"
        position="prepend"
      />Prepended icon<br />
      Icon between<Icon
        icon="user"
        position="between"
      />text<br />
      Dense<Icon
        dense
        icon="user"
        position="between"
      />
      {/* end example */}
    </div>
  )
}
