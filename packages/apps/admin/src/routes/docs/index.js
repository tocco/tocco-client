import {useMemo} from 'react'
import {useStore} from 'react-redux'
import {route} from 'tocco-util'

const Route = props => {
  const store = useStore()
  const Component = useMemo(() => {
    return route.loadRoute(store, () => import('./route'), 'docs')
  }, [store])
  return <Component {...props} />
}

export default Route
