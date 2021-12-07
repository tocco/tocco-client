import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Popover, Typography} from 'tocco-ui'

import {deleteEntityPropType} from '../../utils/deleteRequestParser'

const LinkPopOver = ({relatedEntity, children, maxCountLink}) => {
  if (relatedEntity.keys.length < maxCountLink && relatedEntity.keysOtherBu.length === 0) {
    return children
  }

  const content = (
    <>
      {relatedEntity.keys.length > maxCountLink && (
        <Typography.P>
          <FormattedMessage id="client.delete.tooManyRecords" />
        </Typography.P>
      )}
      {relatedEntity.keysOtherBu.length > 0 && (
        <Typography.P>
          <FormattedMessage id="client.delete.recordInOtherBU" values={{count: relatedEntity.keysOtherBu.length}} />
        </Typography.P>
      )}
    </>
  )

  return (
    <Popover content={content} placement="top">
      {children}
    </Popover>
  )
}

LinkPopOver.propTypes = {
  relatedEntity: deleteEntityPropType.isRequired,
  maxCountLink: PropTypes.number.isRequired,
  children: PropTypes.element
}

export default LinkPopOver
