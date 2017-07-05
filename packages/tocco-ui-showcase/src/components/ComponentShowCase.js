import React from 'react'
import {parse} from 'react-docgen'
import PropsTable from './PropsTable'
import Example from './Example'

const ComponentShowCase = props => {
  const componentInfo = parse(props.componentRaw)
  return (
    <div className="panel panel-default show-case">
      <div className="panel-heading">
        <h1 className="panel-title">{props.componentName}</h1>
      </div>
      <div className="panel-body">
        <div>{componentInfo.description}</div>
        <div className="row">
          <div className="col-sm-6">
            <PropsTable props={componentInfo.props}/>
          </div>
          <div className="col-sm-6">
            <Example example={props.example}/>
          </div>
        </div>
      </div>
    </div>
  )
}

ComponentShowCase.propTypes = {
  componentName: React.PropTypes.string.isRequired,
  example: React.PropTypes.object.isRequired,
  componentRaw: React.PropTypes.string.isRequired
}

export default ComponentShowCase
