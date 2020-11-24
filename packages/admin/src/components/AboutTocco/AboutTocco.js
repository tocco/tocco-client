import React from 'react'
import PropTypes from 'prop-types'
import {Typography, Link} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'

import ToccoLogo from '../../assets/tocco_red.svg'
import {StyledLogo, StyledBlockWrapper, StyledFormattedMessageWrapper} from './StyledComponents'

const AboutTocco = ({niceVersion, niceRevision, intl}) => {
  const msg = id => intl.formatMessage({id})

  return (
    <Typography.Span>
      <StyledLogo src={ToccoLogo} height="53.34" width="580" alt="tocco-logo"/>
      <div dangerouslySetInnerHTML={{__html: msg('client.admin.tocco.address')}}/>
      <Typography.P>
        <Link
          href={msg('client.admin.tocco.homepage')}
          neutral
          target="_blank"
        >
          <FormattedMessage id="client.admin.tocco.homepage"/>
        </Link><br/>
        <Link
          href={'mailto:' + msg('client.admin.tocco.email')}
          neutral
          target="_blank"
        >
          <FormattedMessage id="client.admin.tocco.email"/>
        </Link><br/>
        <Link
          href={'tel:' + msg('client.admin.tocco.phone')}
          neutral
          target="_blank"
        >
          <FormattedMessage id="client.admin.tocco.phone"/>
        </Link>
      </Typography.P>
      <StyledBlockWrapper>
        <Typography.P>
          <FormattedMessage id="client.admin.about.versionLabel"/>:&nbsp; {niceVersion}<br/>
          <FormattedMessage id="client.admin.about.revisionLabel"/>:&nbsp; {niceRevision}
        </Typography.P>
      </StyledBlockWrapper>
      <StyledFormattedMessageWrapper>
        <FormattedMessage id="client.admin.copyright"/>
      </StyledFormattedMessageWrapper>
    </Typography.Span>
  )
}

AboutTocco.propTypes = {
  intl: intlShape,
  niceVersion: PropTypes.string,
  niceRevision: PropTypes.string
}

export default AboutTocco
