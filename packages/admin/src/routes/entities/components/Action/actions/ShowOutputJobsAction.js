import React from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

const ShowOutputJobsAction = props => <Redirect to={{
  pathname: '/e/Output_job/list',
  search: `tql=${encodeURIComponent(`entity=="${props.selection.entityName}"`)}`
}}/>

ShowOutputJobsAction.propTypes = {
  selection: PropTypes.shape({
    entityName: PropTypes.string.isRequired
  }).isRequired
}

export default ShowOutputJobsAction
