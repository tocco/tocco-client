import {connect} from 'react-redux'

import {lazyValueEnhancer} from '../../util/lazyLoading'
import LazyDataEnhancer from './LazyDataEnhancer'

const mapActionCreators = {}

const mapStateToProps = (state, props) => {
  const infos = {
    path: props.path,
    formName: state.entityList.formName,
    key: props.entityKey
  }

  return {
    value: lazyValueEnhancer(props.value, props.type, state.list.lazyData, infos)
  }
}

export default connect(mapStateToProps, mapActionCreators)(LazyDataEnhancer)
