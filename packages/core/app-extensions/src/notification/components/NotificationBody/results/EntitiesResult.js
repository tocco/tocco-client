import _groupBy from 'lodash/groupBy'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Icon, Typography, Popover} from 'tocco-ui'

import {notificationPropType} from '../../../types'
import {StyledDetailLinkWrapper} from '../StyledComponents'

const MAX_COUNT_LINK = 100

const LinkPopover = ({hasTooManyEntities, children}) => {
  if (!hasTooManyEntities) {
    return children
  }

  return (
    <Popover
      content={
        <Typography.P>
          <FormattedMessage id="client.common.notification.tooManyRecords" values={{max: MAX_COUNT_LINK}} />
        </Typography.P>
      }
      placement="top"
    >
      {children}
    </Popover>
  )
}

LinkPopover.propTypes = {
  hasTooManyEntities: PropTypes.bool.isRequired,
  children: PropTypes.element
}

const EntitiesResult = ({notification: {result}, navigationStrategy}) => {
  const {content} = result

  return (
    <>
      {Object.entries(_groupBy(content, e => e.model)).map(([model, entities]) => (
        <StyledDetailLinkWrapper key={'entitylink-' + model}>
          {navigationStrategy && navigationStrategy.ListOrDetailLink && (
            <LinkPopover hasTooManyEntities={entities.length > MAX_COUNT_LINK}>
              <navigationStrategy.ListOrDetailLink
                entityName={model}
                entityKeys={entities.map(e => e.key).slice(0, MAX_COUNT_LINK)}
              >
                <Icon icon="arrow-right" />{' '}
                <FormattedMessage
                  id="client.common.notification.entitiesOpen"
                  values={{modelName: entities.at(0).modelName}}
                />
              </navigationStrategy.ListOrDetailLink>
            </LinkPopover>
          )}
        </StyledDetailLinkWrapper>
      ))}
    </>
  )
}

EntitiesResult.propTypes = {
  notification: notificationPropType.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType,
    ListOrDetailLink: PropTypes.elementType
  })
}

export default EntitiesResult
