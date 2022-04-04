import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {QRCode, Typography, Button} from 'tocco-ui'

import {StyledButtonWrapper} from '../GlobalStyledComponents'
import {StyledQRCodeWrapper, StyledParagraph} from './StyledComponents'

const Secret = ({secret, goToSecretVerification}) => {
  return (
    <>
      <Typography.P>
        <FormattedMessage id="client.two-factor-connector.qrCodeInfo" />
      </Typography.P>
      <StyledQRCodeWrapper>
        <QRCode value={secret.uri} />
      </StyledQRCodeWrapper>
      <Typography.P>
        <FormattedMessage id="client.two-factor-connector.secretInfo" />
      </Typography.P>
      <StyledParagraph>
        <Typography.B>{secret.secret}</Typography.B>
      </StyledParagraph>
      <Typography.P>
        <FormattedMessage id="client.two-factor-connector.backupInfo" />
      </Typography.P>
      <StyledButtonWrapper>
        <Button ink="primary" look="raised" onClick={goToSecretVerification}>
          <FormattedMessage id="client.two-factor-connector.nextButton" />
        </Button>
      </StyledButtonWrapper>
    </>
  )
}

Secret.propTypes = {
  secret: PropTypes.shape({
    secret: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired
  }).isRequired,
  goToSecretVerification: PropTypes.func.isRequired
}

export default Secret
