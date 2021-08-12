import React from 'react'
import {BallMenu, MenuItem} from 'tocco-ui'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import {displayColumnModal, resetSorting, resetPreferences, resetColumns} from '../../modules/preferences/actions'

const NavigationCellHeader = props =>
  !props.disablePreferencesMenu
    ? <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
      <MenuItem onClick={props.displayColumnModal}>
        <FormattedMessage id="client.entity-list.preferences.columns"/>
      </MenuItem>
      <MenuItem onClick={props.resetColumns}>
        <FormattedMessage id="client.entity-list.preferences.columns.reset"/>
      </MenuItem>
      {props.sortable
        && <MenuItem onClick={props.resetSorting}>
          <FormattedMessage id="client.entity-list.sorting.reset"/>
        </MenuItem>
      }
      <MenuItem onClick={props.resetPreferences}>
        <FormattedMessage id="client.entity-list.preferences.reset"/>
      </MenuItem>
    </BallMenu>
    : null

NavigationCellHeader.propTypes = {
  displayColumnModal: PropTypes.func.isRequired,
  resetSorting: PropTypes.func.isRequired,
  resetPreferences: PropTypes.func.isRequired,
  resetColumns: PropTypes.func.isRequired,
  sortable: PropTypes.bool,
  disablePreferencesMenu: PropTypes.bool
}

const mapActionCreators = {
  displayColumnModal,
  resetSorting,
  resetPreferences,
  resetColumns
}

const mapStateToProps = (state, props) => ({
  sortable: state.list.sortable,
  disablePreferencesMenu: state.list.disablePreferencesMenu
})

export default connect(mapStateToProps, mapActionCreators)(NavigationCellHeader)
