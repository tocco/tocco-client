import React from 'react'
import {BallMenu, MenuItem} from 'tocco-ui'
import {connect} from 'react-redux'

import {loadPreferences} from '../../modules/preferences/actions'

const NavigationCellHeader = () =>
  <BallMenu buttonProps={{icon: 'ellipsis-v'}}>
    <MenuItem onClick={() => {}}>Menu Entry</MenuItem>
  </BallMenu>

NavigationCellHeader.propTypes = {

}

const mapActionCreators = {
  loadPreferences
}

export default connect(null, mapActionCreators)(NavigationCellHeader)
