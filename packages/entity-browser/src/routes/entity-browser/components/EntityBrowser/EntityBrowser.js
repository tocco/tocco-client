import React from 'react'
import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'

export class EntityBrowser extends React.Component {
  constructor(props) {
    super(props)
    props.initialize()
  }

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
  initialize: React.PropTypes.func.isRequired,
  showSearchForm: React.PropTypes.bool.isRequired,
  routes: React.PropTypes.array.isRequired,
  showDetailEntityId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ])
}
