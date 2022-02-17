import PropTypes from 'prop-types'
import React, {useRef, useEffect} from 'react'
import {react} from 'tocco-util'

const FileInput = ({instanceCount, directory, onChange, path}) => {
  const fileInput = useRef()

  const prevInstanceCount = react.usePrevious(instanceCount)

  useEffect(() => {
    if (fileInput.current && instanceCount > prevInstanceCount) {
      fileInput.current.click()
    }
  })

  const handleChange = e => {
    const files = e.target.files
    if (files && files.length > 0 && onChange) {
      onChange(path, files, directory)
    }
    e.target.value = null
  }

  return (
    <input
      type="file"
      ref={fileInput}
      style={{display: 'none'}}
      onChange={handleChange}
      multiple
      {...(directory ? {webkitdirectory: 'true', directory: 'true'} : {})}
    />
  )
}

FileInput.propTypes = {
  instanceCount: PropTypes.number.isRequired,
  directory: PropTypes.bool,
  onChange: PropTypes.func,
  path: PropTypes.string
}

export default FileInput
