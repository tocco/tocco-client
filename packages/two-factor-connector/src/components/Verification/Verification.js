import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, EditableValue, StatedValue, Typography} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'

import {StyledButtonWrapper} from '../GlobalStyledComponents'
import {StyledLoginFormInputWrapper} from './StyledComponents'

const Verification = ({verifyCode, intl}) => {
  const [userCode, setUserCode] = useState(null)
  const msg = id => intl.formatMessage({id})
  const handleVerifyClick = () => verifyCode(userCode)

  return <>
    <Typography.P>
      <FormattedMessage id="client.two-factor-connector.verificationText"/>
    </Typography.P>
    <form onSubmit={e => {
      e.preventDefault()
      e.stopPropagation()
      if (userCode && userCode.toString().length >= 6) {
        handleVerifyClick()
      }
    }}>
      <StatedValue
        hasValue={!!userCode}
        id="verification-input"
        label={msg('client.two-factor-connector.verificationInputLabel')}
      >
        <StyledLoginFormInputWrapper>
          <EditableValue
            type="integer"
            value={userCode}
            events={{onChange: setUserCode}}
            options={{format: '### ###', allowLeadingZeros: true}}
          />
        </StyledLoginFormInputWrapper>
      </StatedValue>
      <StyledButtonWrapper>
        <Button
          label={msg('client.two-factor-connector.okButton')}
          ink="primary"
          look="raised"
          type="submit"
          disabled={!userCode || userCode.toString().length < 6}
        />
      </StyledButtonWrapper>
    </form>
  </>
}

Verification.propTypes = {
  intl: intlShape.isRequired,
  verifyCode: PropTypes.func.isRequired
}

export default Verification
