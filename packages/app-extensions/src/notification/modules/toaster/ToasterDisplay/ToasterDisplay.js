import React from 'react'
import PropTypes from 'prop-types'

import Toaster from './Toaster'
import {ToasterPropType} from '../toaster'
import {StyledToasterBox} from './StyledComponents'

const ToasterDisplay = ({toasters, removeToaster}) => {
  const toastersSorted = Object.values(toasters)
    .sort((n1, n2) => new Date(n1.timestamp) - new Date(n2.timestamp))

  return <>
    {toasters && <StyledToasterBox>
      {toastersSorted.map(toaster => {
        return <Toaster
          key={`toaster-${toaster.key}`}
          toaster={toaster}
          closeToaster={(key, manually) => {
            removeToaster(key, manually)
          }}
        />
      })}
    </StyledToasterBox>}
  </>
}

ToasterDisplay.propTypes = {
  toasters: PropTypes.objectOf(ToasterPropType),
  removeToaster: PropTypes.func.isRequired
}

export default ToasterDisplay
