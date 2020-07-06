import React from 'react'
import PropTypes from 'prop-types'
import {Button, Typography, SignalBox} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import {deleteInfoPropTypes} from '../../utils/deleteRequestParser'
import InfoPart from '../InfoPart'

const Dialog = ({dialogInfo, doDelete, onCancel}) =>
  <>
    <Typography.P><FormattedMessage id="client.delete.confirmText"/></Typography.P>
    <InfoPart
      key="infopart-deletable"
      entityName={dialogInfo.entityName}
      entityModel={dialogInfo.entityModel}
      primaryPks={dialogInfo.deletable}
      relatedEntities={dialogInfo.deletableRelated}
      maxCountLink={100}
    />
    {dialogInfo.notDeletable.length > 0
    && <div style={{paddingTop: '20px'}}>
      <Typography.P><FormattedMessage id="client.delete.textNotDeletable"/></Typography.P>
      <InfoPart
        key="infopart-notdeletable"
        entityName={dialogInfo.entityName}
        entityModel={dialogInfo.entityModel}
        primaryPks={dialogInfo.notDeletable}
        relatedEntities={dialogInfo.notDeletableRelated}
        maxCountLink={100}
      />
    </div>
    }
    {dialogInfo.unreadableEntities
    && <div style={{paddingTop: '20px'}}>
      <SignalBox
        condition="warning">
        <Typography.Span><FormattedMessage id="client.delete.unreadableEntities"/></Typography.Span>
      </SignalBox>
    </div>
    }
    <div style={{paddingTop: '20px'}}>
      <Button
        onClick={doDelete}
        disabled={dialogInfo.deletable.length === 0}
      >
        <FormattedMessage id="client.delete.deleteButton"/>
      </Button>
      <Button
        ink="primary"
        onClick={onCancel}
      >
        <FormattedMessage id="client.delete.cancelButton"/>
      </Button>
    </div>
  </>

Dialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  doDelete: PropTypes.func.isRequired,
  dialogInfo: deleteInfoPropTypes.isRequired
}

export default Dialog
