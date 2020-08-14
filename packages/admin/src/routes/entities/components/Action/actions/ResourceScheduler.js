import React from 'react'
import ResourceSchedulerApp from 'tocco-resource-scheduler/src/main'
import PropTypes from 'prop-types'
import {selection as selectionPropType} from 'tocco-util'

import {goBack} from '../../../../../utils/routing'

const ResourceScheduler = ({match, selection, actionProperties}) => {
  const entityBaseUrl = goBack(match.url, 2)
  return <ResourceSchedulerApp
    onEventClick={({model, key}) => {
      window.open(`${entityBaseUrl}/${model}/${key}`, '_blank')
    }}
    selection={selection}
    actionProperties={actionProperties}
  />
}

ResourceScheduler.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired,
  selection: selectionPropType.propType,
  actionProperties: PropTypes.shape({
    calendarType: PropTypes.string
  })
}

export default ResourceScheduler
