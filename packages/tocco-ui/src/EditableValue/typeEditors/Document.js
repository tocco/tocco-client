import React from 'react'

const Document = props => (
  <div className="form-control-static document">
    <a href={props.value.binaryLink} alt={props.value.fileName} download>
      <figure>
        <img alt={props.value.fileName} className="thumbnail" src={props.value.thumbnailLink}/>
        <figcaption className="description">{props.value.fileName}</figcaption>
      </figure>
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
