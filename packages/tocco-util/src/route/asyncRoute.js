import React, {useEffect, useState} from 'react'

export default function asyncRoute(getComponent) {
  return props => {
    const [Component, setComponent] = useState(null)

    useEffect(() => {
      let mounted = true
      getComponent().then(result => mounted ? setComponent(result) : null)
      return () => (mounted = false)
    })

    if (Component !== null) {
      return <Component {...props}/>
    }

    return null
  }
}
