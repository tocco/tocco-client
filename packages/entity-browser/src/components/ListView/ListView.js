import React from 'react'
import {intlShape} from 'react-intl'
import './styles.scss'

import {Grid} from 'react-redux-grid'

const ListView = props => {
  return (
    <div className="list-view">
      { props.columnDefinitions.length > 0
      && <Grid
        columns={props.columnDefinitions}
        data={props.entities}
        plugins={{}}
        stateKey="listView"
      />
      }

    </div>
  )
}

ListView.propTypes = {
  intl: intlShape.isRequired,
  changePage: React.PropTypes.func.isRequired,
  entities: React.PropTypes.array.isRequired,
  orderBy: React.PropTypes.shape({
    name: React.PropTypes.string,
    direction: React.PropTypes.string
  }),
  onEntityClick: React.PropTypes.func,
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
