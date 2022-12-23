import PropTypes from 'prop-types'
import {useState} from 'react'
import {EditableValue, Button} from 'tocco-ui'

import {StyledButtonWrapper, StyledEditableValueWrapper} from './StyledComponents'

const SelectNumRows = ({onOk, numOfRows}) => {
  const options = [
    {key: 1, display: '25'},
    {key: 2, display: '50'},
    {key: 3, display: '100'}
  ]
  const matchingValue = options.find(option => Number(option.display) === numOfRows)
  const [value, setValue] = useState(matchingValue)

  return (
    <>
      <StyledEditableValueWrapper>
        <EditableValue
          value={value}
          type="single-select"
          events={{onChange: setValue}}
          options={{
            options,
            noResultsText: 'no results found',
            isLoading: false
          }}
        />
      </StyledEditableValueWrapper>
      <StyledButtonWrapper>
        <Button onClick={() => onOk(value?.display)} look={'raised'}>
          OK
        </Button>
      </StyledButtonWrapper>
    </>
  )
}

SelectNumRows.propTypes = {
  onOk: PropTypes.func.isRequired,
  numOfRows: PropTypes.number
}

export default SelectNumRows
