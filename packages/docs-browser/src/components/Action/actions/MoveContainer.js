import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

import {initialize, moveElements} from '../../../modules/move/actions'
import {withRouterTypeCompProvider} from '../../../utils/withRouterTypeCompProvider'
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

export default withRouterTypeCompProvider(connect(mapStateToProps, mapActionCreators)(injectIntl(MoveAction)))
