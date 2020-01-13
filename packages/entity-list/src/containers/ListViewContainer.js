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
    selection: state.selection.selection,
    currentPageIds: state.list.entities.map(e => e.__key),
    entityName: state.entityList.entityName,
    parent: state.entityList.parent,
    dataLoadingInProgress: state.list.inProgress,
    showSelectionController: state.selection.showSelectionController
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ListView))
