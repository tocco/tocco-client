import React from 'react'
import PropTypes from 'prop-types'

const handleEntityCreated = (close, answerChannel) => result => {
  close()
  answerChannel.put(result)
}

const RemoteCreate = ({
  DetailApp,
  targetEntity,
  answerChannel,
  close,
  emitAction
}) => {
  return <DetailApp
    entityName={targetEntity}
    formName={targetEntity}
    mode={'create'}
    onEntityCreated={handleEntityCreated(close, answerChannel)}
    emitAction={emitAction}
  />
}

RemoteCreate.propTypes = {
  DetailApp: PropTypes.func.isRequired,
  targetEntity: PropTypes.string.isRequired,
  answerChannel: PropTypes.object.isRequired,
  emitAction: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

export default RemoteCreate
