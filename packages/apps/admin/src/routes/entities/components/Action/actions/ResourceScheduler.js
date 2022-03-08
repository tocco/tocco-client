import PropTypes from 'prop-types'
import React from 'react'
import {selection as selectionPropType} from 'tocco-app-extensions'
import ResourceSchedulerApp from 'tocco-resource-scheduler/src/main'

const ResourceScheduler = ({selection, actionProperties, history}) => {
  return (
    <ResourceSchedulerApp
      onEventClick={({model, key}) => {
        const url = history.createHref({pathname: `/e/${model}/${key}`})
        window.open(url, '_blank')
      }}
      selection={selection}
      actionProperties={actionProperties}
    />
  )
}

ResourceScheduler.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired,
  selection: selectionPropType.propType,
  actionProperties: PropTypes.shape({
    calendarType: PropTypes.string
  }),
  history: PropTypes.shape({
    createHref: PropTypes.func.isRequired
  }).isRequired
}

export default ResourceScheduler
