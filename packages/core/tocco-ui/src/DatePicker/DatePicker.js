import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import ReactDatePicker from 'react-datepicker'
import {injectIntl} from 'react-intl'
import {withTheme} from 'styled-components'

import ChildrenWrapper from './ChildrenWrapper'
import {loadLocales} from './utils'

loadLocales()

const DatePicker = ({children, value, onChange, intl}) => {
  const locale = intl.locale
  const msg = msgId => intl.formatMessage({id: msgId})

  const datePickerRef = useRef(null)
  const [open, setOpen] = useState(false)

  const handleOpen = val => {
    setOpen(val)
    if (datePickerRef.current?.setPreSelection) {
      datePickerRef.current?.setPreSelection(value)
    }
  }

  return (
    <ReactDatePicker
      ref={datePickerRef}
      selected={value}
      preSelection={null}
      onChange={onChange}
      showTimeInput={false}
      dateFormat="P"
      showMonthDropdown
      showYearDropdown
      scrollableYearDropdown
      fixedHeight
      showPopperArrow={false}
      open={open}
      onFocus={() => {
        handleOpen(true)
      }}
      onClickOutside={() => {
        handleOpen(false)
      }}
      locale={locale}
      enableTabLoop={false}
      customInput={
        <ChildrenWrapper
          onOpen={() => {
            handleOpen(true)
          }}
        >
          {children}
        </ChildrenWrapper>
      }
      todayButton={msg('client.component.datePicker.todayLabel')}
    />
  )
}

DatePicker.propTypes = {
  intl: PropTypes.object.isRequired,
  children: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date)
}

export default withTheme(injectIntl(DatePicker))
