import PropTypes from 'prop-types'
import {Navigate} from 'react-router-dom'

const ShowOutputJobsAction = props => (
  <Navigate
    to={{
      pathname: '/e/Output_job/list',
      search: `tql=${encodeURIComponent(`entity=="${props.selection.entityName}"`)}`
    }}
    replace
  />
)

ShowOutputJobsAction.propTypes = {
  selection: PropTypes.shape({
    entityName: PropTypes.string.isRequired
  }).isRequired
}

export default ShowOutputJobsAction
