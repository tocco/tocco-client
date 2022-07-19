import {format} from 'date-fns'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Link, Typography} from 'tocco-ui'

import ToccoLogo from '../../assets/tocco_red.svg'
import {StyledBlockWrapper, StyledFormattedMessageWrapper, StyledLogo} from './StyledComponents'

const AboutTocco = ({niceVersion, niceRevision, buildTimestamp, intl}) => {
  const msg = id => intl.formatMessage({id})
  const json = require('../../../package.json')
  const builTime = format(new Date(buildTimestamp), 'dd.MM.yyyy HH:mm')

  return (
    <Typography.Span>
      <StyledLogo src={ToccoLogo} height="53.34" width="580" alt="tocco-logo" />
      <div dangerouslySetInnerHTML={{__html: msg('client.admin.tocco.address')}} />
      <Typography.P>
        <Link href={msg('client.admin.tocco.homepage')} neutral target="_blank">
          <FormattedMessage id="client.admin.tocco.homepage" />
        </Link>
        <br />
        <Link href={'mailto:' + msg('client.admin.tocco.email')} neutral target="_blank">
          <FormattedMessage id="client.admin.tocco.email" />
        </Link>
        <br />
        <Link href={'tel:' + msg('client.admin.tocco.phone')} neutral target="_blank">
          <FormattedMessage id="client.admin.tocco.phone" />
        </Link>
      </Typography.P>
      <StyledBlockWrapper>
        <Typography.P>
          <FormattedMessage id="client.admin.about.versionLabel" />
          :&nbsp; {niceVersion}
          <br />
          <FormattedMessage id="client.admin.about.revisionLabel" />
          :&nbsp; {niceRevision}
          <br />
          <FormattedMessage id="client.admin.about.clientVersionLabel" />
          :&nbsp; {json.version}
          <br />
          <FormattedMessage id="client.admin.about.buildTimeLabel" />
          :&nbsp; {builTime}
        </Typography.P>
      </StyledBlockWrapper>
      <StyledFormattedMessageWrapper>
        <FormattedMessage id="client.admin.copyright" />
      </StyledFormattedMessageWrapper>
    </Typography.Span>
  )
}

AboutTocco.propTypes = {
  intl: PropTypes.object,
  niceVersion: PropTypes.string,
  niceRevision: PropTypes.string,
  buildTimestamp: PropTypes.number
}

export default AboutTocco
