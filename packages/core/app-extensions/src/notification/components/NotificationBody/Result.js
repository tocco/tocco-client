import PropTypes from 'prop-types'

import {notificationPropType, resultTypes} from '../../types'
import EntitiesResult from './results/EntitiesResult'
import OutputjobResult from './results/OutputJobResult'

const map = {
  [resultTypes.outputjob]: OutputjobResult,
  [resultTypes.entities]: EntitiesResult
}

const Result = ({notification, navigationStrategy}) => {
  const {result} = notification
  const {type} = result

  if (map[type]) {
    const Component = map[type]
    return <Component notification={notification} navigationStrategy={navigationStrategy} />
  }

  // eslint-disable-next-line no-console
  console.log('No Result mapper defined for type', type)
  return null
}

Result.propTypes = {
  notification: notificationPropType.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType,
    ListOrDetailLink: PropTypes.elementType
  })
}

export default Result
