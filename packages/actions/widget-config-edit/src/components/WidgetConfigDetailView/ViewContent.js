import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'

import TextContent from './TextContent'

const ViewContent = ({entityId, onEntityCreated, onEntityUpdated, emitAction, docsApp, listApp}) =>
  entityId.entityName ? (
    <EntityDetailApp
      entityName={entityId.entityName}
      formName={entityId.entityName}
      entityId={entityId.key}
      mode={entityId.key ? 'update' : 'create'}
      onEntityCreated={onEntityCreated}
      onEntityUpdated={onEntityUpdated}
      emitAction={emitAction}
      docsApp={docsApp}
      listApp={listApp}
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
  onEntityUpdated: PropTypes.func,
  emitAction: PropTypes.func,
  docsApp: PropTypes.func,
  listApp: PropTypes.func
}

export default ViewContent
