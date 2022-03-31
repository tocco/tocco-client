import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Button, Typography} from 'tocco-ui'

import {StyledButtonWrapper} from '../GlobalStyledComponents'

const Start = ({twoFactorActive, forced, requestSecret, intl}) => {
  const msg = id => intl.formatMessage({id})

  return (
    <>
      <Typography.P>
        {twoFactorActive ? (
          <FormattedMessage id="client.two-factor-connector.overwriteInfo" />
        ) : forced ? (
          <span dangerouslySetInnerHTML={{__html: msg('client.two-factor-connector.forcedInfo')}} />
        ) : (
          <span dangerouslySetInnerHTML={{__html: msg('client.two-factor-connector.info')}} />
        )}
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
  intl: PropTypes.object.isRequired,
  requestSecret: PropTypes.func.isRequired,
  twoFactorActive: PropTypes.bool,
  forced: PropTypes.bool
}

export default Start
