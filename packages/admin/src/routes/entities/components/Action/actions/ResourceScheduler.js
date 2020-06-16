import React from 'react'
import ResourceSchedulerApp from 'tocco-resource-scheduler/src/main'
import PropTypes from 'prop-types'

import {goBack} from '../../../../../utils/routing'

const ResourceScheduler = ({match}) => {
  const entityBaseUrl = goBack(match.url, 2)
  return <ResourceSchedulerApp
    onEventClick={({model, key}) => {
      window.open(`${entityBaseUrl}/${model}/${key}`, '_blank')
    }}
  />
}

ResourceScheduler.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
}

export default ResourceScheduler
