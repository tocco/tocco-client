import React from 'react'
import PropTypes from 'prop-types'
import {Button, Typography} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'

const Dialog = ({twoFactorActive, connectLogin, intl}) => {
  const msg = id => intl.formatMessage({id})

  if (twoFactorActive) {
    return (
      <div>
        <Typography.P>
          <FormattedMessage id="client.two-factor-connector.overwriteInfo"/>
        </Typography.P>
        <Button
          label={msg('client.two-factor-connector.overwriteButton')}
          ink="primary" look="raised"
          onClick={connectLogin}
        />
      </div>
    )
  }

  return <div>
    <Typography.P><FormattedMessage id="client.two-factor-connector.info"/></Typography.P>
    <Button
      label={msg('client.two-factor-connector.generateButton')}
      ink="primary"
      look="raised"
      onClick={connectLogin}
    />
  </div>
}

Dialog.propTypes = {
  intl: intlShape.isRequired,
  connectLogin: PropTypes.func.isRequired,
  twoFactorActive: PropTypes.bool
}

export default Dialog
