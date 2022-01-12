import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {notification} from 'tocco-app-extensions'
import WidgetConfigEdit from 'tocco-widget-config-edit/src/main'

const mapActionCreators = {
  closeModal: notification.removeModal
}

const Action = ({selection, closeModal, emitAction}) => (
  <WidgetConfigEdit
    selection={selection}
    onSuccess={() => closeModal('action-widget-config-edit')}
    emitAction={emitAction}
  />
)

Action.propTypes = {
  selection: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  emitAction: PropTypes.func.isRequired
}

export default connect(null, mapActionCreators)(Action)
