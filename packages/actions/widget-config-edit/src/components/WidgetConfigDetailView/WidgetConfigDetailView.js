import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {LoadMask} from 'tocco-ui'

import ViewContent from './ViewContent'

const WidgetConfigDetailView = ({
  specificConfigEntityId,
  linking,
  fetchSpecificConfigEntityId,
  linkCreatedSpecificConfig,
  fireSuccess,
  emitAction,
  docsApp,
  listApp
}) => {
  useEffect(() => {
    fetchSpecificConfigEntityId()
  }, [fetchSpecificConfigEntityId])

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
        emitAction={emitAction}
        docsApp={docsApp}
        listApp={listApp}
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
  fireSuccess: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired,
  docsApp: PropTypes.func,
  listApp: PropTypes.func
}

export default WidgetConfigDetailView
