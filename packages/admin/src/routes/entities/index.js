import _omit from 'lodash/omit'
import _omitBy from 'lodash/omitBy'
import React, {memo} from 'react'
import {ReactReduxContext} from 'react-redux'
import {route, js} from 'tocco-util'

const ignoredAttributes = ['location.key', 'location.search', 'location.hash']

function areEqual(prevProps, nextProps) {
  const diff = js.difference(prevProps, nextProps)
  const clean = _omitBy(_omit(diff, ignoredAttributes), v => Object.keys(v).length === 0)
  return Object.entries(clean).length === 0
}

export default memo(
  props => (
    <ReactReduxContext.Consumer>
      {({store}) => {
        const Component = route.loadRoute(store, () => import('./route'))
        return <Component {...props} />
      }}
    </ReactReduxContext.Consumer>
  ),
  areEqual
)
