import {route} from 'tocco-util'
import React from 'react'
import {ReactReduxContext} from 'react-redux'

export default props => {
  return <ReactReduxContext.Consumer>
    {({store}) => {
      const Component = route.loadRoute(store, {}, () => (import('./route')))
      return <Component {...props}/>
    }}
  </ReactReduxContext.Consumer>
}
