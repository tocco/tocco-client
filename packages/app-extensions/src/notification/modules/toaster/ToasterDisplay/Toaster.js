import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Ball, Typography, Icon} from 'tocco-ui'
import {react as reactUtil} from 'tocco-util'

import Content from '../../../components/Content'
import {ToasterPropType} from '../toaster'

const StyledToaster = styled.div`
  ${props => props.type === 'neutral' && `
    background-color: ${props.theme.colors.paper};
  `}
  ${props => props.type === 'info' && `
    background-color: ${props.theme.colors.signal.info.paper};
  `}
  ${props => props.type === 'success' && `
    background-color: ${props.theme.colors.signal.success.paper};
  `}
  ${props => props.type === 'error' && `
    background-color: ${props.theme.colors.signal.danger.paper};
  `}
  margin-bottom: 8px;
  padding: 5px;
`

const Toaster = ({toaster, closeToaster}) => {
  const [setDuration, abort] = reactUtil.useUserActive(() => {
    closeToaster(toaster.key, false)
  })

  useEffect(() => {
    setDuration(toaster.duration)
  }, [toaster.duration])

  const handleToasterClick = () => {
    abort()
  }

  return (
    <StyledToaster onClick={handleToasterClick} type={toaster.type} key={toaster.key}>
      <Ball icon="times" onClick={() => {
        closeToaster(toaster.key, true)
      }} />
      {toaster.icon && <Icon icon={toaster.icon} />}
      {toaster.title && <Typography.H1><Content>{toaster.title}</Content></Typography.H1>}
      {toaster.body && <Content>{toaster.body}</Content>}
    </StyledToaster>
  )
}

Toaster.propTypes = {
  toaster: ToasterPropType,
  closeToaster: PropTypes.func.isRequired
}

export default Toaster
