import PropTypes from 'prop-types'
import {injectIntl, FormattedMessage} from 'react-intl'
import {Icon} from 'tocco-ui'
import {download} from 'tocco-util'

import {notificationPropType} from '../../../types'
import {
  StyledDetailLinkWrapper,
  StyledFileDescription,
  StyledIconWrapper,
  StyledOutputJobWrapper
} from '../StyledComponents'

const OutputjobResult = injectIntl(({notification: {result}, navigationStrategy, intl}) => {
  const {file, content} = result

  const msg = id => intl.formatMessage({id})

  const openLinkTitle = msg('client.common.notification.outputJobFileLink')
  const downloadLinkTitle = msg('client.common.notification.outputJobFileDownload')

  if (!file) {
    return null
  }

  return (
    <StyledOutputJobWrapper>
      <StyledFileDescription>
        <a href={file.link} target="_blank" rel="noreferrer" title={openLinkTitle}>
          {file.description}
        </a>
      </StyledFileDescription>
      <div>
        <a href={file.link} target="_blank" rel="noreferrer" title={openLinkTitle}>
          <StyledIconWrapper>
            <Icon icon="external-link" />
          </StyledIconWrapper>
          <FormattedMessage id="client.common.notification.outputJobFileLink" />
        </a>
      </div>
      {download.downloadSupportedByBrowser() && (
        <a
          href={download.addParameterToURL(file.link, 'download', true)}
          target="_blank"
          rel="noreferrer"
          title={downloadLinkTitle}
        >
          <StyledIconWrapper>
            <Icon icon="arrow-to-bottom" />
          </StyledIconWrapper>
          <FormattedMessage id="client.common.notification.outputJobFileDownload" />
        </a>
      )}
      <StyledDetailLinkWrapper>
        {navigationStrategy && navigationStrategy.DetailLink && (
          <navigationStrategy.DetailLink entityName={content[0].model} entityKey={content[0].key}>
            <Icon icon="arrow-right" /> <FormattedMessage id="client.common.notification.outputJobOpen" />
          </navigationStrategy.DetailLink>
        )}
      </StyledDetailLinkWrapper>
    </StyledOutputJobWrapper>
  )
})

OutputjobResult.propTypes = {
  intl: PropTypes.object.isRequired,
  notification: notificationPropType.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType,
    ListOrDetailLink: PropTypes.elementType
  })
}

export default OutputjobResult
