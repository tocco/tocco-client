import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
// import {Button} from 'tocco-ui'
import SearchFormContainer from '../../containers/SearchFormContainer'
import ListViewContainer from '../../containers/ListViewContainer'

class EntityList extends React.Component {
  componentWillMount() {
    this.props.initialize()
  }

  msg(id) {
    return this.props.intl.formatMessage({id})
  }

  render() {
    return (
      <div className="entity-list">
        {this.props.showSearchForm && <SearchFormContainer/>}
        {/*
        <Button
          onClick={this.props.navigateToCreate}
          label={this.msg('client.entity-list.create')}
          icon="glyphicon-plus"
        />
        */}
        <ListViewContainer/>
      </div>
    )
  }
}

EntityList.propTypes = {
  intl: intlShape.isRequired,
  initialize: PropTypes.func.isRequired,
  navigateToCreate: PropTypes.func.isRequired,
  showSearchForm: PropTypes.bool
}

export default EntityList
