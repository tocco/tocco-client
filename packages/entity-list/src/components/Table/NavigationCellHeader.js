import React from 'react'
import {BallMenu, MenuItem} from 'tocco-ui'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import {resetSorting} from '../../modules/preferences/actions'

const NavigationCellHeader = props =>
  <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
    <MenuItem onClick={props.resetSorting}><FormattedMessage id="client.entity-list.sorting.reset"/></MenuItem>
  </BallMenu>

NavigationCellHeader.propTypes = {
  resetSorting: PropTypes.func.isRequired
}

const mapActionCreators = {
  resetSorting
}

export default connect(null, mapActionCreators)(NavigationCellHeader)
