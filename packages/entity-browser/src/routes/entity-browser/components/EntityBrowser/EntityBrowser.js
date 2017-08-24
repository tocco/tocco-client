import PropTypes from 'prop-types'
import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'
import {notifier} from 'tocco-util'

class EntityBrowser extends React.Component {
  render() {
    return (
      <div>
        <ReduxToastr {...notifier.defaultToastrOptions} />
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
