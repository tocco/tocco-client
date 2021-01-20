import React from 'react'
import PropTypes from 'prop-types'
import {Button, Typography} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'

const Result = ({success, goToStart, setupSuccessful, intl}) => {
  const msg = id => intl.formatMessage({id})

  if (setupSuccessful) {
    return <div>
      <Typography.P>
        <FormattedMessage id="client.two-factor-connector.successfulText"/>
      </Typography.P>
      <Button
        label={msg('client.two-factor-connector.okButton')}
        ink="primary"
        look="raised"
        onClick={success}
      />
    </div>
  }

  return <div>
    <Typography.P>
      <FormattedMessage id="client.two-factor-connector.errorText"/>
    </Typography.P>
    <Button
      label={msg('client.two-factor-connector.okButton')}
      ink="primary"
      look="raised"
      onClick={goToStart}
    />
  </div>
}

Result.propTypes = {
  intl: intlShape.isRequired,
  success: PropTypes.func.isRequired,
  goToStart: PropTypes.func.isRequired,
  setupSuccessful: PropTypes.bool
}

export default Result
