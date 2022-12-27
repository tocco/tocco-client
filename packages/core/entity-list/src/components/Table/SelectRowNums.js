import PropTypes from 'prop-types'
import {useState} from 'react'
import {injectIntl, FormattedMessage} from 'react-intl'
import {EditableValue, Button} from 'tocco-ui'

import {StyledButtonWrapper, StyledEditableValueWrapper} from './StyledComponents'

const SelectNumRows = injectIntl(({intl, onOk, numOfRows}) => {
  const msg = id => intl.formatMessage({id})
  const options = [
    {key: 25, display: '25'},
    {key: 50, display: '50'},
    {key: 100, display: '100'}
  ]
  const matchingValue = options.find(option => option.key === numOfRows)
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
            noResultsText: msg('client.entity-list.preferences.numOfRows.noResultsText'),
            isLoading: false
          }}
        />
      </StyledEditableValueWrapper>
      <StyledButtonWrapper>
        <Button onClick={() => onOk(value?.key)} look={'raised'}>
          <FormattedMessage id="client.entity-list.preferences.numOfRows.okButton" />
        </Button>
      </StyledButtonWrapper>
    </>
  )
})

SelectNumRows.propTypes = {
  intl: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  numOfRows: PropTypes.number
}

export default SelectNumRows
