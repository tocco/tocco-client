import React from 'react'
import {ExternalEvents} from 'tocco-util'
import {FormattedMessage} from 'react-intl'

export const EntityResponseTable = props => {
  if (!props.responseEntities || props.responseEntities.length === 0) return (<div/>)
  return (
    <div>
      <h4>{props.title}</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th><FormattedMessage id="client.entityoperation.action.merge.entity"/></th>
            <th><FormattedMessage id="client.entityoperation.action.merge.primaryKey"/></th>
            <th><FormattedMessage id="client.entityoperation.action.merge.label"/></th>
          </tr>
        </thead>
        <tbody>
          {
            props.responseEntities.map((e, idx) => {
              return (
                <tr key={idx}>
                  <td>{e.entity}</td>
                  <td>{e.pk}</td>
                  <td>{e.name}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

EntityResponseTable.propTypes = {
  title: React.PropTypes.string.isRequired,
  responseEntities: React.PropTypes.array.isRequired
}

export const PermissionMessageBox = props => {
  if (!props.showPermissionMessage || props.showPermissionMessage === false) return <div/>
  return (
    <div className="alert alert-info">
      <FormattedMessage id="client.entityoperation.action.merge.missingReadPermissions"/>
    </div>
  )
}

PermissionMessageBox.propTypes = {
  showPermissionMessage: React.PropTypes.bool.isRequired
}

class MergeResponse extends React.Component {
  render() {
    console.log('this.props.mergeResponse', this.props.mergeResponse)
    return (
      <div className="merge-response">
        <h1><FormattedMessage id="client.entityoperation.action.merge.responseTitle"/></h1>
        <span><FormattedMessage id="client.entityoperation.action.merge.responseDescription"/></span>
        <EntityResponseTable
          title={this.props.intl.formatMessage({id: 'client.entityoperation.action.merge.notCopiedRelationsTitle'})}
          responseEntities={this.props.mergeResponse.notCopiedRelations}
        />
        <EntityResponseTable
          title={this.props.intl.formatMessage({id: 'client.entityoperation.action.merge.notDeletedEntitiesTitle'})}
          responseEntities={this.props.mergeResponse.notDeletedEntities}
        />
        <PermissionMessageBox
          showPermissionMessage={this.props.mergeResponse.showPermissionMessage}
        />
        <button
          className="btn btn-primary close-button"
          onClick={() => { ExternalEvents.invokeExternalEvent('close') }}
        >
          <FormattedMessage id="client.entityoperation.action.merge.close"/>
        </button>
      </div>
    )
  }
}

MergeResponse.propTypes = {
  mergeResponse: React.PropTypes.object.isRequired,
  intl: React.PropTypes.object.isRequired
}

export default MergeResponse
