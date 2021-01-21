import React from 'react'
import PropTypes from 'prop-types'
import {Button, Typography} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'

import {StyledButtonWrapper} from '../GlobalStyledComponents'

const Start = ({twoFactorActive, requestSecret, intl}) => {
  const msg = id => intl.formatMessage({id})

  return (
    <>
      <Typography.P>
        {
          twoFactorActive
            ? <FormattedMessage id="client.two-factor-connector.overwriteInfo"/>
            : <FormattedMessage id="client.two-factor-connector.info"/>
        }
      </Typography.P>
      <StyledButtonWrapper>
        <Button
          label={msg('client.two-factor-connector.nextButton')}
          ink="primary"
          look="raised"
          onClick={requestSecret}
        />
      </StyledButtonWrapper>
    </>
  )
}

Start.propTypes = {
  intl: intlShape.isRequired,
  requestSecret: PropTypes.func.isRequired,
  twoFactorActive: PropTypes.bool
}

export default Start
