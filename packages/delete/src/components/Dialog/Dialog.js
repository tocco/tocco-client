import React from 'react'
import PropTypes from 'prop-types'
import {Button, Typography, SignalBox} from 'tocco-ui'
import {navigationStrategy} from 'tocco-util'
import {FormattedMessage} from 'react-intl'

import {deleteInfoPropType} from '../../utils/deleteRequestParser'
import InfoPart from '../InfoPart'
import {StyledSectionWrapper, StyledButtonsWrapper} from './StyledComponents'

const Dialog = ({
  dialogInfo: {
    rootEntitiesDeletable,
    rootEntitiesNotDeletable,
    relatedDeletable,
    relatedNotDeletable,
    hasUnreadableEntities
  }, doDelete, onCancel, navigationStrategy
}) => <>
    <Typography.P><FormattedMessage id="client.delete.confirmText"/></Typography.P>
    <InfoPart
      key="infopart-deletable"
      rootEntities={rootEntitiesDeletable}
      relatedEntities={relatedDeletable}
      maxCountLink={100}
      navigationStrategy={navigationStrategy}
    />
    {Object.keys(rootEntitiesNotDeletable).length > 0
      && <StyledSectionWrapper>
        <Typography.P><FormattedMessage id="client.delete.textNotDeletable"/></Typography.P>
        <InfoPart
          key="infopart-notdeletable"
          rootEntities={rootEntitiesNotDeletable}
          relatedEntities={relatedNotDeletable}
          maxCountLink={100}
          navigationStrategy={navigationStrategy}
        />
      </StyledSectionWrapper>
    }
    {hasUnreadableEntities
      && <StyledSectionWrapper>
        <SignalBox
          condition="warning">
          <Typography.Span><FormattedMessage id="client.delete.unreadableEntities"/></Typography.Span>
        </SignalBox>
      </StyledSectionWrapper>
    }
    <StyledSectionWrapper>
      <StyledButtonsWrapper>
        <Button
          onClick={doDelete}
          disabled={Object.keys(rootEntitiesDeletable).every(entity => rootEntitiesDeletable[entity].keys.length === 0)}
        >
          <FormattedMessage id="client.delete.deleteButton"/>
        </Button>
        <Button
          ink="primary"
          onClick={onCancel}
        >
          <FormattedMessage id="client.delete.cancelButton"/>
        </Button>
      </StyledButtonsWrapper>
    </StyledSectionWrapper>
  </>

Dialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  doDelete: PropTypes.func.isRequired,
  dialogInfo: deleteInfoPropType.isRequired,
  navigationStrategy: navigationStrategy.propTypes
}

export default Dialog
