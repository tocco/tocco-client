import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Popover, Typography} from 'tocco-ui'
import PropTypes from 'prop-types'

import {relatedPropTypes} from '../../utils/deleteRequestParser'

const LinkPopOver = ({relatedEntity, children, maxCountLink}) => {
  if (relatedEntity.pks.length < maxCountLink && relatedEntity.pksOtherBu.length === 0) {
    return children
  }

  const content = <>
    {relatedEntity.pks.length > maxCountLink
    && <Typography.P>
      <FormattedMessage id="client.delete.tooManyRecords"/>
    </Typography.P>
    }
    {relatedEntity.pksOtherBu.length > 0
    && <Typography.P>
      <FormattedMessage id="client.delete.recordInOtherBU" values={{count: relatedEntity.pksOtherBu.length}}/>
    </Typography.P>
    }
  </>

  return <Popover
    content={content}
    placement="top"
    spacer={10}
  >
    {children}
  </Popover>
}

LinkPopOver.propTypes = {
  relatedEntity: relatedPropTypes.isRequired,
  maxCountLink: PropTypes.number.isRequired,
  children: PropTypes.element
}

export default LinkPopOver
