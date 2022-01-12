import PropTypes from 'prop-types'
import React from 'react'
import EntityDetailApp from 'tocco-entity-detail/src/main'

import TextContent from './TextContent'

const ViewContent = ({entityId, onEntityCreated, onEntityUpdated}) =>
  entityId.entityName ? (
    <EntityDetailApp
      entityName={entityId.entityName}
      formName={entityId.entityName}
      entityId={entityId.key}
      mode={entityId.key ? 'update' : 'create'}
      onEntityCreated={onEntityCreated}
      onEntityUpdated={onEntityUpdated}
    />
  ) : (
    <TextContent messageId="client.widget-config-edit.noConfig" />
  )

ViewContent.propTypes = {
  entityId: PropTypes.shape({
    entityName: PropTypes.string,
    key: PropTypes.string
  }),
  onEntityCreated: PropTypes.func,
  onEntityUpdated: PropTypes.func
}

export default ViewContent
