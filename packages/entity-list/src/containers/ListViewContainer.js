import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import ListView from '../components/ListView'
import {initialize} from '../modules/list/actions'

const mapActionCreators = {
  initialize
}

const mapStateToProps = (state, props) => {
  return {
    formDefinition: state.list.formDefinition,
    selection: state.list.selection,
    currentPageIds: state.list.entities.map(e => e.__key),
    entityName: state.entityList.entityName
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))
