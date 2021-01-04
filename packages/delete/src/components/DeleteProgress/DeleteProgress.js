import React from 'react'
import {LoadingSpinner, Typography} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'
import {navigationStrategy} from 'tocco-util'

import {deleteInfoPropType} from '../../utils/deleteRequestParser'
import InfoPart from '../InfoPart'

const DeleteProgress = ({dialogInfo, navigationStrategy}) => {
  return <>
    <LoadingSpinner size="30px"/>
    <Typography.P><FormattedMessage id="client.delete.deleteInProgress"/></Typography.P>
    <InfoPart
      key="infopart-deletable"
      entityName={dialogInfo.entityName}
      entityLabel={dialogInfo.entityLabel}
      keys={dialogInfo.keysDeletable}
      relatedEntities={dialogInfo.relatedDeletable}
      maxCountLink={100}
      navigationStrategy={navigationStrategy}
    />
  </>
}

DeleteProgress.propTypes = {
  dialogInfo: deleteInfoPropType.isRequired,
  intl: intlShape.isRequired,
  navigationStrategy: navigationStrategy.propTypes
}

export default DeleteProgress
