import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'

import {initialize, moveElements} from '../../../modules/move/actions'
import {MoveAction} from './Move'

const mapActionCreators = {
  initialize,
  moveElements
}

const mapStateToProps = state => ({
  isWaiting: state.docs.move.isWaiting,
  domainTypes: state.input.domainTypes,
  rootNodes: state.input.rootNodes,
  businessUnit: state.input.businessUnit,
  locale: state.intl.locale
})

const MoveContainer = connect(mapStateToProps, mapActionCreators)(MoveAction)

export default injectIntl(props => <MoveContainer {...props} />)
