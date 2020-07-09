import React from 'react'
import PropTypes from 'prop-types'
import {Button, Typography, SignalBox} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import {deleteInfoPropType} from '../../utils/deleteRequestParser'
import InfoPart from '../InfoPart'

const Dialog = ({dialogInfo, doDelete, onCancel}) =>
  <>
    <Typography.P><FormattedMessage id="client.delete.confirmText"/></Typography.P>
    <InfoPart
      key="infopart-deletable"
      entityName={dialogInfo.entityName}
      entityLabel={dialogInfo.entityLabel}
      keys={dialogInfo.keysDeletable}
      relatedEntities={dialogInfo.relatedDeletable}
      maxCountLink={100}
    />
    {dialogInfo.keysNotDeletable.length > 0
    && <div style={{paddingTop: '20px'}}>
      <Typography.P><FormattedMessage id="client.delete.textNotDeletable"/></Typography.P>
      <InfoPart
        key="infopart-notdeletable"
        entityName={dialogInfo.entityName}
        entityLabel={dialogInfo.entityLabel}
        keys={dialogInfo.keysNotDeletable}
        relatedEntities={dialogInfo.relatedNotDeletable}
        maxCountLink={100}
      />
    </div>
    }
    {dialogInfo.hasUnreadableEntities
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
        disabled={dialogInfo.keysDeletable.length === 0}
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
  dialogInfo: deleteInfoPropType.isRequired
}

export default Dialog
