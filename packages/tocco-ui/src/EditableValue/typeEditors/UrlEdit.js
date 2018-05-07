import PropTypes from 'prop-types'
import React from 'react'

const StringEdit = props => {
  const value = props.value || ''

  const normalizeUrl = url => {
    url = url.toLowerCase()
    if (url.indexOf('.') > 0 && !/^[a-z0-9]+:\/\//.test(url)) {
      url = `https://${url}`
    }

    return url
  }

  const handleChange = e => {
    const url = normalizeUrl(e.target.value)
    if (props.onChange) {
      props.onChange(url)
    }
  }

  return (
    <div className={value ? 'input-group' : ''}>
      <input
        type="url"
        className="form-control"
        name={props.name}
        value={value}
        onChange={handleChange}
        id={props.id}
        disabled={props.readOnly}
      />
      {value && <span className="input-group-addon">
        <a tabIndex="-1" href={value} target="_blank" rel="noopener noreferrer">
          <span className="fa fa-external-link"/>
        </a>
      </span>}
    </div>
  )
}

StringEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default StringEdit
