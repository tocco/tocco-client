import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'
import styled from 'styled-components'

const DICTIONARY = {
  older: 'Älter',
  newer: 'Neuer'
}

const StyledHeader = styled.div`
  margin-bottom: 8px;
`
const Header = ({keys, delta}) => {
  const [labelInstance, setLabelInstance] = useState('')
  const [statusInstance, setStatusInstance] = useState('')
  const [labelDelta, setLabelDelta] = useState('')
  const [statusDelta, setStatusDelta] = useState('')

  const getFetchRequest = async key => {
    const options = {credentials: 'include'}
    const url = `${__BACKEND_URL__}/nice2/rest/entities/Installation/${key}?relations=!&_fields=!`
    const response = await fetch(url, options)
    return response.json()
  }

  const fetchLabels = async() => {
    const [instanceInstallation, deltaInstallation] = await Promise.all(
      [getFetchRequest(keys[0]),
        getFetchRequest(keys[1])]
    )
    setLabelInstance(instanceInstallation.display)
    setLabelDelta(deltaInstallation.display)
  }

  useEffect(() => {
    fetchLabels()
  }, [keys])

  useEffect(() => {
    if (delta) {
      const instanceStatus = delta.newerRevision === delta.instanceRevision ? DICTIONARY.newer : DICTIONARY.older
      const deltaStatus = delta.newerRevision === delta.deltaRevision ? DICTIONARY.newer : DICTIONARY.older

      setStatusInstance(`${instanceStatus}, Rev: ${delta.instanceRevision}`)
      setStatusDelta(`${deltaStatus}, Rev: ${delta.deltaRevision}`)
    }
  }, [delta])

  return <StyledHeader>
    <Typography.B>Zeige alle Commits zwischen:</Typography.B>
    <Typography.Span>
      <div>{labelInstance}&emsp;{statusInstance}</div>
      <div>{labelDelta}&emsp;{statusDelta}</div>
    </Typography.Span>
  </StyledHeader>
}

Header.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  delta: PropTypes.PropTypes.shape({
    newerRevision: PropTypes.string.isRequired,
    deltaRevision: PropTypes.string.isRequired,
    instanceRevision: PropTypes.string.isRequired
  })
}

export default Header
