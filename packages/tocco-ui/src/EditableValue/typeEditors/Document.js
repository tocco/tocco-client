import React from 'react'

const Document = props => (
  <div className="form-control-static">
    <a href={props.value.binaryLink} download>
      {props.value.fileName}
    </a>
  </div>
)

Document.propTypes = {
  value: React.PropTypes.shape({
    fileName: React.PropTypes.string,
    binaryLink: React.PropTypes.string
  }).isRequired
}

export default Document
