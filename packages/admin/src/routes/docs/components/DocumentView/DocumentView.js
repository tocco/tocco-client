import React from 'react'
import PropTypes from 'prop-types'
import EntityDetailApp from 'tocco-entity-detail/src/main'

const DocumentView = props => (
  <EntityDetailApp
    entityName="Resource"
    entityId={props.match.params.key}
    formName="Resource"
    mode="update"
  />
)

DocumentView.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object
}

export default DocumentView
