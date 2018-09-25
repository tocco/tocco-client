import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup} from 'tocco-ui'

const OkCancelButtons = props =>
  <ButtonGroup look="raised">
    <Button
      label={props.okText}
      ink="primary"
      onClick={props.onOk}
    />
    <Button
      label={props.cancelText}
      onClick={
        () => {
          props.onCancel()
          props.close()
        }
      }
    />
  </ButtonGroup>

OkCancelButtons.propTypes = {
  cancelText: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
  okText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired
}

export default OkCancelButtons
