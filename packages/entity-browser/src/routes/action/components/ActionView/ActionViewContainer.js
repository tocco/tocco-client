import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {queryString as queryStringUtil} from 'tocco-util'
import _get from 'lodash/get'

import ActionView from './ActionView'

const mapStateToProps = (state, props) => {
  const queryParams = queryStringUtil.fromQueryString(location.search)
  const selection = _get(props.router.location, 'state.selection', queryParams.actionProperties)
  const actionProperties = _get(props.router.location, 'state.definition.properties', queryParams.actionProperties)

  return {
    selection,
    actionProperties
  }
}

export default connect(mapStateToProps, null)(injectIntl(ActionView))
