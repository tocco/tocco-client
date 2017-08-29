import PropTypes from 'prop-types'
import React from 'react'
import Example from './Example'

const CodeShowCase = props => {
  return (
    <div className="panel panel-default show-case">
      <div className="panel-heading">
        <h1 className="panel-title">{props.componentName}</h1>
      </div>
      <div className="panel-body">
        <div>{props.description}</div>
        <div className="row">
          <div className="col-sm-12">
            <Example example={props.example}/>
          </div>
        </div>
      </div>
    </div>
  )
}

CodeShowCase.propTypes = {
  componentName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  example: PropTypes.object.isRequired
}

export default CodeShowCase
