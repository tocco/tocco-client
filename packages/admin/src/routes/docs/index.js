import {route} from 'tocco-util'
import React, {useMemo} from 'react'
import {useStore} from 'react-redux'

const Route = props => {
  const store = useStore()
  const Component = useMemo(() => {
    return route.loadRoute(store, {}, () => (import('./route')), 'docs')
  }, [])
  return <Component {...props}/>
}

export default Route
