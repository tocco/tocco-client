import React from 'react'
import {intlShape} from 'react-intl'

import {Grid} from 'react-redux-grid'

class ListView extends React.Component {
  componentWillMount() {
    this.props.initialize()
  }

  render() {
    return (
      <div className="list-view">
        {this.props.columnDefinitions.length > 0
        && <Grid
          columns={this.props.columnDefinitions}
          data={this.props.entities}
          plugins={{}}
          stateKey="listView"
        />
        }

      </div>
    )
  }
}

ListView.propTypes = {
  intl: intlShape.isRequired,
  initialize: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired,
  changePage: React.PropTypes.func.isRequired,
  entities: React.PropTypes.array.isRequired,
  showSearchForm: React.PropTypes.bool,
  orderBy: React.PropTypes.shape({
    name: React.PropTypes.string,
    direction: React.PropTypes.string
  }),
  redirect: React.PropTypes.func,
  currentPage: React.PropTypes.number,
  limit: React.PropTypes.number,
  columnDefinitions: React.PropTypes.arrayOf(
    React.PropTypes.shape(
      {
        value: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string)
        ]).isRequired,
        label: React.PropTypes.string,
        order: React.PropTypes.int
      }
    )
  ).isRequired,
  entityCount: React.PropTypes.number,
  setOrderBy: React.PropTypes.func,
  refresh: React.PropTypes.func,
  inProgress: React.PropTypes.bool
}

export default ListView
