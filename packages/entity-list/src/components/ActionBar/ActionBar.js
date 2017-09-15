import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {Button} from 'tocco-ui'

const ActionBar = props => {
  const msg = id => {
    return props.intl.formatMessage({id})
  }

  return (
    <div className="action-bar">
      {props.showCreateButton && props.permissions.create
      && <Button
        onClick={props.navigateToCreate}
        className="create-btn"
        label={msg('client.entity-list.create')}
        icon="glyphicon-plus"
      />}
    </div>
  )
}

ActionBar.propTypes = {
  intl: intlShape.isRequired,
  navigateToCreate: PropTypes.func.isRequired,
  permissions: PropTypes.objectOf(PropTypes.bool).isRequired,
  showCreateButton: PropTypes.bool
}

export default ActionBar
