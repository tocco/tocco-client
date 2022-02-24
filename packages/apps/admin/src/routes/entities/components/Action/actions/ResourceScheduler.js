import {createPath} from 'history'
import PropTypes from 'prop-types'
import {selection as selectionPropType} from 'tocco-app-extensions'
import ResourceSchedulerApp from 'tocco-resource-scheduler/src/main'

const ResourceScheduler = ({selection, actionProperties}) => {
  return (
    <ResourceSchedulerApp
      onEventClick={({model, key}) => {
        const url = createPath({pathname: `/e/${model}/${key}`})
        window.open(url, '_blank')
      }}
      selection={selection}
      actionProperties={actionProperties}
    />
  )
}

ResourceScheduler.propTypes = {
  selection: selectionPropType.propType,
  actionProperties: PropTypes.shape({
    calendarType: PropTypes.string
  })
}

export default ResourceScheduler
