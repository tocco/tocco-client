import React from 'react'
import {externalEvents} from 'tocco-util'
import {FormattedMessage, intlShape} from 'react-intl'

export const EntityResponseTable = props => {
  if (!props.responseEntities || props.responseEntities.length === 0) return <div/>
  return (
    <div>
      <h4>{props.title}</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th><FormattedMessage id="client.merge.entity"/></th>
            <th><FormattedMessage id="client.merge.primaryKey"/></th>
            <th><FormattedMessage id="client.merge.label"/></th>
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

class MergeResponse extends React.Component {
  render() {
    return (
      <div className="merge-response">
        <h1><FormattedMessage id="client.merge.responseTitle"/></h1>
        <span><FormattedMessage id="client.merge.responseDescription"/></span>
        <EntityResponseTable
          title={this.props.intl.formatMessage({id: 'client.merge.notCopiedRelationsTitle'})}
          responseEntities={this.props.mergeResponse.notCopiedRelations}
        />
        <EntityResponseTable
          title={this.props.intl.formatMessage({id: 'client.merge.notDeletedEntitiesTitle'})}
          responseEntities={this.props.mergeResponse.notDeletedEntities}
        />
        {(this.props.mergeResponse.showPermissionMessage)
        && <div className="alert alert-info">
          <FormattedMessage id="client.merge.missingReadPermissions"/>
        </div>
        }
        <button
          className="btn btn-primary close-button"
          onClick={() => { externalEvents.invokeExternalEvent('close') }}
        >
          <FormattedMessage id="client.merge.close"/>
        </button>
      </div>
    )
  }
}

MergeResponse.propTypes = {
  mergeResponse: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired
}

export default MergeResponse
