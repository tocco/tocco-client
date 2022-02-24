import _get from 'lodash/get'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {queryString as queryStringUtil} from 'tocco-util'

import ActionView from './ActionView'

const mapStateToProps = (state, props) => {
  const queryParams = queryStringUtil.fromQueryString(location.search)
  const selection = _get(props.location, 'state.selection', queryParams.actionProperties)
  const actionProperties = _get(props.location, 'state.definition.properties', queryParams.actionProperties)

  return {
    selection,
    actionProperties,
    locale: state.intl.locale
  }
}

export default connect(mapStateToProps, null)(injectIntl(ActionView))
