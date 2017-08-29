import PropTypes from 'prop-types'
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
  value: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    binaryLink: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string.isRequired
  }).isRequired
}

export default Document
