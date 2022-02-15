import React from 'react'
import {useParams} from 'react-router-dom'

import LazyAction from '../LazyAction'

const ActionView = props => {
  const params = useParams()
  const {appId} = params

  return <LazyAction appId={appId} {...props} />
}

ActionView.propTypes = {}

export default ActionView
