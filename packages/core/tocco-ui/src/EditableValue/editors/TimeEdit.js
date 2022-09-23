import PropTypes from 'prop-types'

import Ball from '../../Ball'
import {StyledEditableControl, StyledEditableWrapper} from '../StyledEditableValue'
import StyledTimeEdit from './StyledTimeEdit'
import useTimeEdit from './useTimeEdit'

const TimeEdit = ({onChange, value, immutable, id, name}) => {
  const {inputProps, clearButtonProps} = useTimeEdit(value, onChange)
  const showClearButton = value && !immutable

  return (
    <StyledEditableWrapper immutable={immutable}>
      <StyledTimeEdit type="text" disabled={immutable} id={id} immutable={immutable} name={name} {...inputProps} />
      {showClearButton && (
        <StyledEditableControl>
          <Ball icon="times" {...clearButtonProps} tabIndex={-1} />
        </StyledEditableControl>
      )}
    </StyledEditableWrapper>
  )
}

TimeEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default TimeEdit
