import React from 'react'
import {BallMenu, MenuItem} from 'tocco-ui'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import {displayColumnModal, resetSorting, resetPreferences, resetColumns} from '../../modules/preferences/actions'

const NavigationCellHeader = props =>
  <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
    <MenuItem onClick={() => props.displayColumnModal(props.parent)}>
      <FormattedMessage id="client.entity-list.preferences.columns"/>
    </MenuItem>
    <MenuItem onClick={props.resetColumns}>
      <FormattedMessage id="client.entity-list.preferences.columns.reset"/>
    </MenuItem>
    <MenuItem onClick={props.resetSorting}><FormattedMessage id="client.entity-list.sorting.reset"/></MenuItem>
    <MenuItem onClick={props.resetPreferences}><FormattedMessage id="client.entity-list.preferences.reset"/></MenuItem>
  </BallMenu>

NavigationCellHeader.propTypes = {
  displayColumnModal: PropTypes.func.isRequired,
  resetSorting: PropTypes.func.isRequired,
  resetPreferences: PropTypes.func.isRequired,
  resetColumns: PropTypes.func.isRequired,
  parent: PropTypes.shape({
    key: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    reverseRelationName: PropTypes.string
  })
}

const mapStateToProps = state => ({
  parent: state.entityList.parent
})

const mapActionCreators = {
  displayColumnModal,
  resetSorting,
  resetPreferences,
  resetColumns
}

export default connect(mapStateToProps, mapActionCreators)(NavigationCellHeader)
