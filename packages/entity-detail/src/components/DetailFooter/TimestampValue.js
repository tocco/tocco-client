import React from 'react'
import PropTypes from 'prop-types'
import {FormattedValue} from 'tocco-ui'
import {FormattedRelativeTime} from 'react-intl'
import {selectUnit} from '@formatjs/intl-utils'

import {StyledTimestampRelativeValue, StyledTimestampValueWrapper} from './StyledComponents'

const TimestampValue = ({value}) => {
  const {value: diffValue, unit} = selectUnit(new Date(value))

  return <StyledTimestampValueWrapper>
    <FormattedValue value={value} type="datetime"/>
    <StyledTimestampRelativeValue>
      (<FormattedRelativeTime value={diffValue} unit={unit}/>)
    </StyledTimestampRelativeValue>
  </StyledTimestampValueWrapper>
}

TimestampValue.propTypes = {
  value: PropTypes.string.isRequired
}

export default TimestampValue
