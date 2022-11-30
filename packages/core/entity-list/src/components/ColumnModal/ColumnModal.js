import PropTypes from 'prop-types'
import {useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {Button, ColumnPicker} from 'tocco-ui'

import {StyledButtonWrapper} from './StyledComponents'

const ColumnModal = ({onOk, initialColumns, dndEnabled}) => {
  const [columns, setColumns] = useState(initialColumns)

  return (
    <>
      <ColumnPicker columns={columns} onColumnsChange={setColumns} dndEnabled={dndEnabled} />
      <StyledButtonWrapper>
        <Button onClick={() => onOk(columns)} look={'raised'}>
          <FormattedMessage id="client.entity-list.preferences.columns.okButton" />
        </Button>
      </StyledButtonWrapper>
    </>
  )
}

ColumnModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  initialColumns: PropTypes.array,
  dndEnabled: PropTypes.bool
}

export default ColumnModal
