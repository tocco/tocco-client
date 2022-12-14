import _get from 'lodash/get'
import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import {externalEvents} from 'tocco-app-extensions'
import {queryString as queryStringUtil} from 'tocco-util'

import ActionView from './ActionView'

const mapActionCreators = {
  fireStateChangeEvent: externalEvents.fireStateChangeEvent
}

const mapStateToProps = (state, props) => {
  const queryParams = queryStringUtil.fromQueryString(location.search)
  const selection = _get(props.router.location, 'state.selection', queryParams.actionProperties)
  const actionProperties = _get(props.router.location, 'state.definition.properties', queryParams.actionProperties)

  return {
    selection,
    actionProperties,
    locale: state.intl.locale
  }
}

export default connect(mapStateToProps, mapActionCreators)(injectIntl(ActionView))
