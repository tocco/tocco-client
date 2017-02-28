import React from 'react'
import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'

export class EntityBrowser extends React.Component {
  render() {
    return (
      <div>
        {this.props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))
        }
      </div>
    )
  }
}

EntityBrowser.propTypes = {
  showSearchForm: React.PropTypes.bool,
  routes: React.PropTypes.array.isRequired,
  showDetailEntityId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ])
}
