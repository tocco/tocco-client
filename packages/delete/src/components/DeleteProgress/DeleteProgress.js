import React from 'react'
import {LoadingSpinner, Typography} from 'tocco-ui'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {navigationStrategy} from 'tocco-util'

import {deleteInfoPropType} from '../../utils/deleteRequestParser'
import InfoPart from '../InfoPart'
import {StyledIconWrapper} from './StyledComponents'

const DeleteProgress = ({dialogInfo, navigationStrategy}) => {
  return <>
    <StyledIconWrapper>
      <LoadingSpinner size="30px"/>
    </StyledIconWrapper>
    <Typography.P><FormattedMessage id="client.delete.deleteInProgress"/></Typography.P>
    <InfoPart
      key="infopart-deletable"
      rootEntities={dialogInfo.rootEntitiesDeletable}
      relatedEntities={dialogInfo.relatedDeletable}
      maxCountLink={100}
      navigationStrategy={navigationStrategy}
    />
  </>
}

DeleteProgress.propTypes = {
  dialogInfo: deleteInfoPropType.isRequired,
  intl: PropTypes.object.isRequired,
  navigationStrategy: navigationStrategy.propTypes
}

export default DeleteProgress
