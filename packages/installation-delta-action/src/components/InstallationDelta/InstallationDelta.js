import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

const InstallationDelta = ({keys}) => {
  const [delta, setDelta] = useState(null)

  useEffect(async() => {
    setDelta({})
    // const response = await fetch('nice2/rest/tocco/installationDelta', {method: 'POST'})
    // const myJson = await response.json()
    // setDelta(myJson)
  }, [])

  return (
    <div>
      <h1>Installation Delta</h1>
      {JSON.stringify(delta)}
    </div>
  )
}

InstallationDelta.propTypes = {
  keys: PropTypes.string.isRequired
}

export default InstallationDelta
