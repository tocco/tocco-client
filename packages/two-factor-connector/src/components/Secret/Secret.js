import React from 'react'
import PropTypes from 'prop-types'
import {QRCode, Typography, Button} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import {StyledButtonWrapper} from '../GlobalStyledComponents'
import {StyledQRCodeWrapper, StyledParagraph} from './StyledComponents'

const Secret = ({secret, goToSecretVerification}) => {
  return <>
    <Typography.P>
      <FormattedMessage id="client.two-factor-connector.qrCodeInfo"/>
    </Typography.P>
    <StyledQRCodeWrapper>
      <QRCode value={secret.uri}/>
    </StyledQRCodeWrapper>
    <Typography.P>
      <FormattedMessage id="client.two-factor-connector.secretInfo"/>
    </Typography.P>
    <StyledParagraph>
      <Typography.B>{secret.text}</Typography.B>
    </StyledParagraph>
      <Typography.P>
        <FormattedMessage id="client.two-factor-connector.backupInfo"/>
      </Typography.P>
    <StyledButtonWrapper>
      <Button
        ink="primary"
        look="raised"
        onClick={goToSecretVerification}
      >
        <FormattedMessage id="client.two-factor-connector.nextButton"/>
      </Button>
    </StyledButtonWrapper>
  </>
}

Secret.propTypes = {
  secret: PropTypes.shape({
    text: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired
  }).isRequired,
  goToSecretVerification: PropTypes.func.isRequired
}

export default Secret
