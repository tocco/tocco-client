import PropTypes from 'prop-types'
import {useEffect, useRef} from 'react'
import {injectIntl} from 'react-intl'
import {withTheme} from 'styled-components'

import {theme} from '../utilStyles'
import {StyledWrapper} from './StyledDatePicker'
import {useDatePickr} from './useDatePickr'

export const DatePicker = props => {
  const {value, children, intl, onChange} = props
  const wrapperElement = useRef(null)
  const locale = intl.locale
  const msg = id => intl.formatMessage({id})

  const fontFamily = theme.fontFamily('regular')(props)

  const flatpickrOptions = {}
  const initializeFlatPickr = useDatePickr(wrapperElement, {
    value,
    onChange,
    fontFamily,
    locale,
    flatpickrOptions,
    shouldAppend: true
  })

  // only on mount
  useEffect(() => {
    if (wrapperElement.current) {
      initializeFlatPickr()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <StyledWrapper data-wrap ref={wrapperElement}>
        <div data-toggle>
          <input
            style={{display: 'none'}}
            type="text"
            data-input
            aria-label={msg('client.component.datePicker.label')}
          />
          {children}
        </div>
      </StyledWrapper>
    </>
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
  intl: PropTypes.object.isRequired
}

export default withTheme(injectIntl(DatePicker))
