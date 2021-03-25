import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {declareFont} from 'tocco-ui'

import Toaster from './Toaster'
import {ToasterPropType} from '../toaster'

const StyledToasterBox = styled.div`
  ${declareFont()};
  position: absolute;
  height: 100vh;
  width: 200px;
  right: 10px;
  z-index: 99999999999;
`

const ToasterDisplay = ({toasters, removeToaster}) => {
  const toastersSorted = Object.values(toasters)
    .sort((n1, n2) => new Date(n1.timestamp) - new Date(n2.timestamp))

  return (
        <StyledToasterBox>
            {toastersSorted.map(toaster => {
              return <Toaster
              key={`toaster-${toaster.key}`}
              toaster={toaster}
              closeToaster={(key, manually) => {
                removeToaster(key, manually)
              }}
              />
            })}
        </StyledToasterBox>
  )
}

ToasterDisplay.propTypes = {
  toasters: PropTypes.objectOf(ToasterPropType),
  removeToaster: PropTypes.func.isRequired
}

export default ToasterDisplay
