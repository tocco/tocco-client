import React from 'react'
import {intlShape} from 'react-intl'

import {Grid} from 'react-redux-grid'
import {Pagination} from 'tocco-ui'
import SearchFormContainer from '../../containers/SearchFormContainer'

class ListView extends React.Component {
  componentWillMount() {
    this.props.initialize()
  }

  onPageChange = page => {
    this.props.changePage(page)
  }

  render() {
    return (
      <div className="list-view">
        {this.props.showSearchForm && <SearchFormContainer/>}
        {this.props.columnDefinitions.length > 0
        && <Grid
          columns={this.props.columnDefinitions}
          data={this.props.entities}
          plugins={{
            PAGER: {
              enabled: true,
              pagingType: 'locale',
              pagerComponent: (
                <Pagination
                  totalRecords={this.props.entityCount}
                  recordsPerPage={this.props.limit}
                  onPageChange={this.onPageChange}
                  currentPage={this.props.currentPage}
                />
              )
            }
          }}
          stateKey="listViewGrid"
          reducerKeys="grid"
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
