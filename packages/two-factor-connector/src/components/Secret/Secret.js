import React from 'react'
import PropTypes from 'prop-types'
import {QRCode, scale, Typography, StyledP, Button} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'

const StyledQRCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${scale.space(0)};
`

const StyledParagraph = styled(StyledP)`
  text-align: center;
`

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
    <Button
      ink="primary"
      look="raised"
      onClick={goToSecretVerification}
    >
      <FormattedMessage id="client.two-factor-connector.nextButton"/>
    </Button>
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
