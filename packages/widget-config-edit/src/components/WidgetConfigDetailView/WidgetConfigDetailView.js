import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {LoadMask} from 'tocco-ui'

import ViewContent from './ViewContent'

const WidgetConfigDetailView = ({
  specificConfigEntityId,
  linking,
  fetchSpecificConfigEntityId,
  linkCreatedSpecificConfig,
  fireSuccess
}) => {
  useEffect(() => {
    fetchSpecificConfigEntityId()
  }, [])

  const handleEntityCreated = ({id}) => {
    linkCreatedSpecificConfig({
      entityName: specificConfigEntityId.entityName,
      key: id
    })
  }

  return (
    <LoadMask required={[specificConfigEntityId, !linking]}>
      <ViewContent
        entityId={specificConfigEntityId}
        onEntityCreated={handleEntityCreated}
        onEntityUpdated={fireSuccess}
      />
    </LoadMask>
  )
}

WidgetConfigDetailView.propTypes = {
  specificConfigEntityId: PropTypes.shape({
    entityName: PropTypes.string,
    key: PropTypes.string
  }),
  linking: PropTypes.bool.isRequired,
  fetchSpecificConfigEntityId: PropTypes.func.isRequired,
  linkCreatedSpecificConfig: PropTypes.func.isRequired,
  fireSuccess: PropTypes.func.isRequired
}

export default WidgetConfigDetailView
