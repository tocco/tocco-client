import React from 'react'
import PropsTable from './PropsTable'
import Example from './Example'

export default class ShowCase extends React.Component {
  static propTypes = {
    componentName: React.PropTypes.string.isRequired,
    componentInfo: React.PropTypes.object.isRequired,
    example: React.PropTypes.object
  }

  render() {
    return (
      <div className="panel panel-default show-case">
        <div className="panel-heading">
          <h1 className="panel-title">{this.props.componentName}</h1>
        </div>
        <div className="panel-body">
          <div>{this.props.componentInfo.description}</div>
          <div className="row">
            <div className="col-sm-6">
              <PropsTable props={this.props.componentInfo.props}/>
            </div>
            <div className="col-sm-6">
              <Example example={this.props.example}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
