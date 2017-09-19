import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {navigateToCreate} from '../modules/actionBar/actions'
import ActionBar from '../components/ActionBar/ActionBar'

const mapActionCreators = {
  navigateToCreate
}

const mapStateToProps = (state, props) => ({
  createPermission: state.list.createPermission,
  showCreateButton: state.entityList.showCreateButton
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ActionBar))
