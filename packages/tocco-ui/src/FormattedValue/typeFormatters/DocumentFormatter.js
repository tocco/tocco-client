import PropTypes from 'prop-types'
import React from 'react'
import Upload from '../../Upload'
const DocumentFormatter = props => (
  <div className="form-control-static document">
    <Upload
      readOnly={true}
      value={props.value ? props.value : null}
      onUpload={() => {}}
    />
  </div>
)

DocumentFormatter.propTypes = {
  value: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    binaryLink: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string.isRequired
  }).isRequired
}

export default DocumentFormatter
