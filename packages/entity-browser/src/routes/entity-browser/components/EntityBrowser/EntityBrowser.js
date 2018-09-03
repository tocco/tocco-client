import PropTypes from 'prop-types'
import React from 'react'
import {notifier} from 'tocco-util'

import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'

class EntityBrowser extends React.Component {
  render() {
    return (
      <div>
        <notifier.Notifier/>
        {this.props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))
        }
      </div>
    )
  }
}

EntityBrowser.propTypes = {
  routes: PropTypes.array.isRequired
}

export default EntityBrowser
