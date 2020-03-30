import PropTypes from 'prop-types'
import React from 'react'
import {withTheme} from 'styled-components'

import Icon from '../../Icon'

const BooleanFormatter = props =>
  <Icon
    style={{fontSize: `${props.theme.fontSize.base}rem`}}
    icon={props.value ? 'check' : 'times'}
  />

BooleanFormatter.propTypes = {
  value: PropTypes.bool,
  theme: PropTypes.shape({
    fontSize: PropTypes.shape({
      base: PropTypes.number
    })
  })
}

export default withTheme(BooleanFormatter)
