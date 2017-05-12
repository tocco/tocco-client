import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'
import '!style-loader!css-loader!react-redux-toastr/lib/css/react-redux-toastr.min.css'

const toastrOptions = {
  newestOnTop: false,
  preventDuplicates: true,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  progressBar: true
}

class EntityBrowser extends React.Component {
  componentWillMount() {
    this.props.initialize()
  }

  render() {
    return (
      <div>
        <ReduxToastr {...toastrOptions} />
        {this.props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))
        }
      </div>
    )
  }
}

EntityBrowser.propTypes = {
  initialize: React.PropTypes.func.isRequired,
  routes: React.PropTypes.array.isRequired
}

export default EntityBrowser
