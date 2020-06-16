import React from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

import {goBack} from '../../../../../utils/routing'

const CashManagement = props => {
  const entityBaseUrl = goBack(props.match.url, 2)
  return <Redirect to={entityBaseUrl + '/Cash_management_import/list?formName=Cash_management_import_action'}/>
}

CashManagement.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
}

export default CashManagement
