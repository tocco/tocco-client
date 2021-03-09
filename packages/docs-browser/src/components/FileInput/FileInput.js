import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const FileInput = ({instanceCount, directory, onChange}) => {
  const fileInput = useRef()

  const prevInstanceCount = usePrevious(instanceCount)

  useEffect(() => {
    if (fileInput.current && instanceCount > prevInstanceCount) {
      fileInput.current.click()
    }
  })

  const handleChange = e => {
    const files = e.target.files
    if (files && files.length > 0 && onChange) {
      onChange(files, directory)
    }
    e.target.value = null
  }
  
  return <input
    type="file"
    ref={fileInput}
    style={{display: 'none'}}
    onChange={handleChange}
    multiple {...(directory ? {webkitdirectory: 'true', directory: 'true'} : {})}
  />
}

FileInput.propTypes = {
  instanceCount: PropTypes.number.isRequired,
  directory: PropTypes.bool,
  onChange: PropTypes.func
}

export default FileInput
