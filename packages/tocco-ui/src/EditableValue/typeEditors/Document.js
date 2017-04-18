import React from 'react'

const Document = props => (
  <div className="form-control-static document">
    <a href={props.value.binaryLink} download>
      <img src={props.value.thumbnailLink}/>
      {props.value.fileName}
    </a>
  </div>
)

Document.propTypes = {
  value: React.PropTypes.shape({
    fileName: React.PropTypes.string.isRequired,
    binaryLink: React.PropTypes.string.isRequired,
    thumbnailLink: React.PropTypes.string.isRequired
  }).isRequired
}

export default Document
