import React from 'react'
import PropTypes from 'prop-types'
import ReduxToastr from 'react-redux-toastr'

import {defaultToastrOptions} from '../notifier'
import ModalDisplayContainer from '../modules/modalComponents/ModalDisplayContainer'

const Notifier = props => {
  return (
    <div className="tocco-notifier">
      <ReduxToastr {...props.toastrOptions} />
      <ModalDisplayContainer/>
    </div>
  )
}

Notifier.defaultProps = {
  toastrOptions: defaultToastrOptions
}

Notifier.propTypes = {
  toastrOptions: PropTypes.object
}

export default Notifier
