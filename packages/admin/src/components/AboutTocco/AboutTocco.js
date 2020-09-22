import React from 'react'
import PropTypes from 'prop-types'
import {Typography, scale, Link} from 'tocco-ui'
import {FormattedMessage, intlShape} from 'react-intl'
import styled from 'styled-components'

import ToccoLogo from '../../assets/tocco_red.svg'

const StyledFormattedMessageWrapper = styled.div`
  font-size: ${scale.font(-1.5)};
  margin-top: ${scale.space(0.5)};
`

const StyledBlockWrapper = styled.div`
  margin-top: ${scale.space(0.5)};
`

const AboutTocco = ({niceVersion, niceRevision, intl}) => {
  const msg = id => intl.formatMessage({id})

  return <Typography.Span>
    <img width="80%" src={ToccoLogo}/>
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
}

AboutTocco.propTypes = {
  intl: intlShape,
  niceVersion: PropTypes.string,
  niceRevision: PropTypes.string
}

export default AboutTocco
