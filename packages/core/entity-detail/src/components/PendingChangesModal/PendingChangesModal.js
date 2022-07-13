import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {FormattedMessage} from 'react-intl'
import {Button} from 'tocco-ui'

import {StyledButtonWrapper} from './StyledComponents'

const PendingChangesModal = ({onYes, onNo}) => {
  useEffect(() => {
    const handleKeyInput = e => {
      if (e.key === 'Enter') {
        onYes()
      }
    }

    document.addEventListener('keydown', handleKeyInput)
    return () => {
      document.removeEventListener('keydown', handleKeyInput)
    }
  }, [onYes])

  return (
    <StyledButtonWrapper>
      <Button ink="primary" type="button" onClick={onYes}>
        <FormattedMessage id="client.common.yes" />
      </Button>
      <Button type="button" onClick={onNo}>
        <FormattedMessage id="client.common.no" />
      </Button>
    </StyledButtonWrapper>
  )
}

PendingChangesModal.propTypes = {
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired
}

export default PendingChangesModal
