import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Button, Typography} from 'tocco-ui'

import {StyledButtonWrapper} from '../GlobalStyledComponents'

const Start = ({twoFactorActive, forced, requestSecret, intl}) => {
  const msg = id => intl.formatMessage({id})

  const renderInfo = () => {
    if (twoFactorActive) {
      return <FormattedMessage id="client.two-factor-connector.overwriteInfo" />
    }

    const infoMsg = forced ? msg('client.two-factor-connector.forcedInfo') : msg('client.two-factor-connector.info')
    return <span dangerouslySetInnerHTML={{__html: infoMsg}} />
  }

  return (
    <>
      <Typography.P>{renderInfo()}</Typography.P>
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
  intl: PropTypes.object.isRequired,
  requestSecret: PropTypes.func.isRequired,
  twoFactorActive: PropTypes.bool,
  forced: PropTypes.bool
}

export default Start
