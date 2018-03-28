import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage, intlShape} from 'react-intl'
import {Button} from 'tocco-ui'

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
  title: PropTypes.string.isRequired,
  responseEntities: PropTypes.array.isRequired
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
        <Button
          ink="primary"
          label={this.msg('client.merge.close')}
          look="raised"
          onClick={() => { this.props.fireExternalEvent('close') }}
        />
      </div>
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
