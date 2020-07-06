import React from 'react'
import {LoadingSpinner, Typography} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'

import {deleteInfoPropTypes} from '../../utils/deleteRequestParser'
import InfoPart from '../InfoPart'

const DeleteProgress = ({dialogInfo, intl}) => {
  return <>
    <LoadingSpinner size="30px"/>
    <Typography.P><FormattedMessage id="client.delete.deleteInProgress"/></Typography.P>
    <InfoPart
      key="infopart-deletable"
      entityName={dialogInfo.entityName}
      entityModel={dialogInfo.entityModel}
      primaryPks={dialogInfo.deletable}
      relatedEntities={dialogInfo.deletableRelated}
      maxCountLink={100}
    />
  </>
}

DeleteProgress.propTypes = {
  dialogInfo: deleteInfoPropTypes,
  intl: intlShape.isRequired
}

export default DeleteProgress
