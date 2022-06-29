import PropTypes from 'prop-types'
import {useEffect, useRef} from 'react'
import {FormattedMessage} from 'react-intl'
import {Button} from 'tocco-ui'

import {StyledButtonWrapper} from './StyledComponents'

const PendingChangesModal = ({onYes, onNo, onCancel}) => {
  const saveButtonRef = useRef(null)

  useEffect(() => {
    if (saveButtonRef.current) {
      saveButtonRef.current.focus()
    }
  }, [])

  return (
    <StyledButtonWrapper>
      <Button ink="primary" type="button" onClick={onYes} ref={saveButtonRef}>
        <FormattedMessage id="client.common.yes" />
      </Button>
      <Button type="button" onClick={onNo}>
        <FormattedMessage id="client.common.no" />
      </Button>
      <Button type="button" onClick={onCancel}>
        <FormattedMessage id="client.common.cancel" />
      </Button>
    </StyledButtonWrapper>
  )
}

PendingChangesModal.propTypes = {
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default PendingChangesModal
