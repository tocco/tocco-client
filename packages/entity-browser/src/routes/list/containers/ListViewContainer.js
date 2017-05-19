import {connect} from 'react-redux'
import EntityListApp from 'entity-list/src/main'

const mapActionCreators = {
}

const mapStateToProps = (state, props) => {
  return {
    entityName: state.entityBrowser.entityName,
    formBase: state.entityBrowser.formBase,
    showSearchForm: state.input.showSearchForm,
    limit: state.input.limit,
    searchFilters: state.input.searchFilters,
    preselectedSearchFields: state.input.preselectedSearchFields,
    disableSimpleSearch: state.input.disableSimpleSearch,
    simpleSearchFields: state.input.simpleSearchFields,
    onRowClick: e => {
      props.router.history.push(`/detail/${e.id}`)
    }
  }
}

export default connect(mapStateToProps, mapActionCreators)(EntityListApp)
