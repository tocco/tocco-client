import {connect} from 'react-redux'

import LazyDataEnhancer from './LazyDataEnhancer'
import {lazyValueEnhancer} from '../../util/lazyLoading'

const mapActionCreators = {}

const mapStateToProps = (state, props) => {
  const infos = {
    path: props.path,
    formName: state.list.formDefinition.id,
    key: props.entityKey
  }

  return {
    value: lazyValueEnhancer(props.value, props.type, state.list.lazyData, infos)
  }
}

export default connect(mapStateToProps, mapActionCreators)(LazyDataEnhancer)
