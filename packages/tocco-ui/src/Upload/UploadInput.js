import PropTypes from 'prop-types'
import classNames from 'classnames'
import React from 'react'
import Dropzone from 'react-dropzone'

const UploadInput = props => {
  const onDrop = files => {
    props.onDrop(files[0])
  }

  const classes = classNames('dragzone', {'disabled': props.readOnly})

  return <div>
    <Dropzone disabled={props.readOnly} className={classes} multiple={false} onDrop={onDrop}>
      <i className="fa fa-upload" aria-hidden="true"></i><span>{props.text || 'drag and drop or click'}</span>
    </Dropzone>
  </div>
}

UploadInput.propTypes = {
  readOnly: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  text: PropTypes.string
}

export default UploadInput
