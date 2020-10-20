import React from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

import {goBack} from '../../../../../utils/routing'

const IncomingPayment = props => {
  const entityBaseUrl = goBack(props.match.url, 2)
  return <Redirect to={entityBaseUrl + '/Incoming_payment/list'}/>
}

IncomingPayment.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
}

export default IncomingPayment
