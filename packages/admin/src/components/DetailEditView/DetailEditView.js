import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

const DetailEditView = props => {
  return (
    <div>
      <Typography.H1>Detail Edit View</Typography.H1>
      <Typography.Span>{JSON.stringify(props.match)}</Typography.Span>
    </div>
  )
}

DetailEditView.propTypes = {
  match: PropTypes.object
}

export default DetailEditView
