import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup} from 'tocco-ui'

const YesNoCancelButtons = props =>
  <ButtonGroup look="raised">
    <Button
      label={props.yesText}
      ink="primary"
      onClick={props.onYes}
    />
    <Button
      label={props.noText}
      onClick={props.onNo}
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

YesNoCancelButtons.propTypes = {
  cancelText: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
  noText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
  yesText: PropTypes.string.isRequired
}

export default YesNoCancelButtons
