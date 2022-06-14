import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import ReactDatePicker from 'react-datepicker'
import {injectIntl} from 'react-intl'
import {withTheme} from 'styled-components'

import {StyledChildrenWrapper} from './StyledComponents'
import {loadLocales} from './utils'

loadLocales()

const ChildrenWrapper = ({children, onOpen}) => (
  <StyledChildrenWrapper onClick={onOpen}>{children}</StyledChildrenWrapper>
)

ChildrenWrapper.propTypes = {
  children: PropTypes.any,
  onOpen: PropTypes.func
}

const DatePicker = props => {
  const {children, value, onChange, intl} = props

  const locale = intl.locale

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
      showPopperArrow={false}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
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
