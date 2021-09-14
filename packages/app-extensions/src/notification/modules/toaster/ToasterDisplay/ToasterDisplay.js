import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Toaster from './Toaster'
import {ToasterPropType} from '../toaster'
import {StyledToasterBox} from './StyledComponents'

const ToasterDisplay = ({toasters, removeToaster, cancelTask, navigationStrategy}) => {
  const toastersSorted = Object.values(toasters)
    .sort((n1, n2) => new Date(n1.timestamp) - new Date(n2.timestamp))

  return <>
    {toasters && ReactDOM.createPortal(<StyledToasterBox>
      {toastersSorted.map(toaster => {
        return <Toaster
          key={`toaster-${toaster.key}`}
          toaster={toaster}
          closeToaster={(key, manually) => {
            removeToaster(key, manually)
          }}
          cancelTask={cancelTask}
          navigationStrategy={navigationStrategy}
        />
      })}
    </StyledToasterBox>, document.body)}
  </>
}

ToasterDisplay.propTypes = {
  toasters: PropTypes.objectOf(ToasterPropType),
  removeToaster: PropTypes.func.isRequired,
  cancelTask: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default ToasterDisplay
