import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {
  Button,
  SignalBox,
  Typography
} from 'tocco-ui'

import {
  StyledMergeMatrixTable,
  StyledMergeMatrixTd,
  StyledMergeMatrixTh
} from '../MergeMatrix/StyledMergeMatrix'

export const EntityResponseTable = props => {
  if (!props.responseEntities || props.responseEntities.length === 0) return <div/>
  return (
    <React.Fragment>
      <Typography.H5>{props.title}</Typography.H5>
      <StyledMergeMatrixTable>
        <thead>
          <tr>
            <StyledMergeMatrixTh bold><FormattedMessage id="client.merge.entity"/></StyledMergeMatrixTh>
            <StyledMergeMatrixTh bold><FormattedMessage id="client.merge.primaryKey"/></StyledMergeMatrixTh>
            <StyledMergeMatrixTh bold><FormattedMessage id="client.merge.label"/></StyledMergeMatrixTh>
          </tr>
        </thead>
        <tbody>
          {
            props.responseEntities.map((e, idx) => {
              return (
                <tr key={idx}>
                  <StyledMergeMatrixTd>{e.entity}</StyledMergeMatrixTd>
                  <StyledMergeMatrixTd>{e.pk}</StyledMergeMatrixTd>
                  <StyledMergeMatrixTd>{e.name}</StyledMergeMatrixTd>
                </tr>
              )
            })
          }
        </tbody>
      </StyledMergeMatrixTable>
    </React.Fragment>
  )
}

EntityResponseTable.propTypes = {
  title: PropTypes.string.isRequired,
  responseEntities: PropTypes.array.isRequired
}

class MergeResponse extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography.H4><FormattedMessage id="client.merge.responseTitle"/></Typography.H4>
        <Typography.P><FormattedMessage id="client.merge.responseDescription"/></Typography.P>
        <EntityResponseTable
          title={this.props.intl.formatMessage({id: 'client.merge.notCopiedRelationsTitle'})}
          responseEntities={this.props.mergeResponse.notCopiedRelations}
        />
        <EntityResponseTable
          title={this.props.intl.formatMessage({id: 'client.merge.notDeletedEntitiesTitle'})}
          responseEntities={this.props.mergeResponse.notDeletedEntities}
        />
        {(this.props.mergeResponse.showPermissionMessage)
          && <SignalBox condition="danger">
            <Typography.Span><FormattedMessage id="client.merge.missingReadPermissions"/></Typography.Span>
          </SignalBox>
        }
        <Button
          ink="primary"
          label={this.msg('client.merge.close')}
          look="raised"
          onClick={() => { this.props.fireExternalEvent('close') }}
        />
      </React.Fragment>
    )
  }

  msg(id) {
    return this.props.intl.formatMessage({
      id
    })
  }
}

MergeResponse.propTypes = {
  fireExternalEvent: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  mergeResponse: PropTypes.object.isRequired
}

export default MergeResponse
