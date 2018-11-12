import React from 'react'
import PropTypes from 'prop-types'
import ReduxToastr from 'react-redux-toastr'

import {defaultToastrOptions} from '../notifier'
import ModalDisplayContainer from '../modules/modalComponents/ModalDisplayContainer'
import {StyledNotifier} from './StyledNotifier'

const Notifier = props => {
  return (
    <StyledNotifier>
      <div className="tocco-notifier">
        <ReduxToastr {...props.toastrOptions} />
        <ModalDisplayContainer/>
      </div>
    </StyledNotifier>
  )
}

Notifier.defaultProps = {
  toastrOptions: defaultToastrOptions
}

Notifier.propTypes = {
  toastrOptions: PropTypes.object
}

export default Notifier
