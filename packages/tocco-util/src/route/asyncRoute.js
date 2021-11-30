import React, {useEffect, useState} from 'react'

export default function asyncRoute(getComponent) {
  return props => {
    const [Component, setComponent] = useState(null)

    useEffect(() => {
      getComponent().then(result => {
        setComponent(result)
      })
    })

    if (Component !== null) {
      return <Component {...props}/>
    }

    return null
  }
}
