import {route, js} from 'tocco-util'
import React, {memo} from 'react'
import {ReactReduxContext} from 'react-redux'

function areEqual(prevProps, nextProps) {
  const diff = js.difference(prevProps, nextProps)
  return Object.entries(diff).length === 0
}

export default memo(
  props => (
    <ReactReduxContext.Consumer>
      {({store}) => {
        const Component = route.loadRoute(store, {}, () => (import('./route')))
        return <Component {...props}/>
      }}
    </ReactReduxContext.Consumer>
  ),
  areEqual
)
