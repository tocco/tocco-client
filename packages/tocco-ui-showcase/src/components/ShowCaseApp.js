import React from 'react'

import Navigation from './Navigation'
import ShowCaseList from './ShowCaseList'
import Affix from './Affix'

export default class ShowCaseApp extends React.Component {
  static propTypes = {
    componentsTree: React.PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="show-case-app">
        <div className="col title">
          <span>Tocco UI</span>
        </div>
        <div className="col-md-9">
          <ShowCaseList componentsTree={this.props.componentsTree}/>
        </div>
        <div className="col-md-2 hidden-xs hidden-sm">
          <Affix className="navi-affix" offset={80}>
            <Navigation componentsTree={this.props.componentsTree}/>
          </Affix>
        </div>
      </div>
    )
  }
}
