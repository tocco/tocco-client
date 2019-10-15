import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import {injectIntl, intlShape} from 'react-intl'
import styled, {withTheme} from 'styled-components'

import {theme} from '../utilStyles'
import {useDatePickr} from './useDatePickr'

const WrapperStyle = styled.div`
  cursor: pointer;
  
  .flatpickr-calendar.open  {
    top: auto !important;
  }
`

export const DatePicker = props => {
  const {value, children, intl, onChange} = props
  const wrapperElement = useRef(null)
  const locale = intl.locale

  const fontFamily = theme.fontFamily('regular')(props)

  useDatePickr(wrapperElement, {value, onChange, fontFamily, locale})

  return (
    <WrapperStyle
      data-wrap
      ref={wrapperElement}
    >
      <div data-toggle>
        <input
          style={{display: 'none'}}
          type="text"
          data-input
        />
        {children}
      </div>
    </WrapperStyle>
  )
}

DatePicker.propTypes = {
  /**
   * Any content to wrap a onclick around to open a calendar
   */
  children: PropTypes.node.isRequired,
  /**
   * Function triggered on every date selection. First parameter is the picked date as iso string.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * To set the selected date from outside the component.
   */
  value: PropTypes.any,
  intl: intlShape.isRequired
}

export default withTheme(injectIntl(DatePicker))
