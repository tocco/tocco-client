import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {
  Typography
} from 'tocco-ui'
import TwoFactorConnectorApp from 'tocco-two-factor-connector/src/main'

import {Pages} from '../../types/Pages'

const TwoFactorConnectorForm = ({username, password, secret, showTitle, changePage}) => {
  return <div>
    {showTitle && <Typography.H5><FormattedMessage id="client.login.form.title"/></Typography.H5>}
    <TwoFactorConnectorApp
      username={username}
      password={password}
      secret={secret}
      forced={true}
      onSuccess={() => {
        changePage(Pages.LOGIN_FORM)
      }}
    />
  </div>
}

TwoFactorConnectorForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  secret: PropTypes.shape({
    text: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired
  }).isRequired,
  showTitle: PropTypes.bool,
  changePage: PropTypes.func.isRequired
}

export default TwoFactorConnectorForm
