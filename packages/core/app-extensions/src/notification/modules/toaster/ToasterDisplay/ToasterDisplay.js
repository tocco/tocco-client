import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'

import {ToasterPropType} from '../toaster'
import {StyledToasterBox} from './StyledComponents'
import Toaster from './Toaster'

const ToasterDisplay = ({toasters, removeToaster, cancelTask, navigationStrategy}) => {
  const toastersSorted = Object.values(toasters).sort((n1, n2) => new Date(n1.timestamp) - new Date(n2.timestamp))
  const Toasters = toastersSorted.map(toaster => (
    <Toaster
      key={`toaster-${toaster.key}`}
      toaster={toaster}
      closeToaster={removeToaster}
      cancelTask={cancelTask}
      navigationStrategy={navigationStrategy}
    />
  ))

  return <>{toasters && ReactDOM.createPortal(<StyledToasterBox>{Toasters}</StyledToasterBox>, document.body)}</>
}

ToasterDisplay.propTypes = {
  toasters: PropTypes.objectOf(ToasterPropType),
  removeToaster: PropTypes.func.isRequired,
  cancelTask: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default ToasterDisplay
