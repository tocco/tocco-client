import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

const ShowOutputJobsAction = props => {
  const [doRedirect, setDoRedirect] = useState(false)

  useEffect(() => {
    // If we redirect to the Output_job list right away, the UI gets stuck between
    // two views because of some race conditions. This `setTimeout` makes sure all
    // running sagas have completed when we redirect to avoid messing up the state.
    setTimeout(() => setDoRedirect(true), 0)
  }, [])

  return doRedirect
    ? <Redirect to={{
      pathname: '/e/Output_job/list',
      search: `tql=${encodeURIComponent(`entity=="${props.selection.entityName}"`)}`
    }}/>
    : null
}

ShowOutputJobsAction.propTypes = {
  selection: PropTypes.shape({
    entityName: PropTypes.string.isRequired
  }).isRequired
}

export default ShowOutputJobsAction
