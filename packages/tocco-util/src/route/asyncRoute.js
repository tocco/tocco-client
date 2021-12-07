import React, {useEffect, useRef, useState} from 'react'

export default function asyncRoute(getComponent) {
  return props => {
    const [Component, setComponent] = useState(null)
    const mounted = useRef(true)

    useEffect(() => {
      getComponent().then(result => (mounted.current ? setComponent(() => result) : null))
      return () => {
        mounted.current = false
      }
    }, [])

    if (Component !== null) {
      return <Component {...props} />
    }

    return null
  }
}
