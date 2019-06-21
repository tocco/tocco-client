import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {
  design,
  Icon,
  Typography
} from 'tocco-ui'

import {StyledMergeMatrixTh} from '../StyledMergeMatrix'

const HeaderRow = props => {
  const isTargetEntity = pk => pk === props.targetEntityPk

  return (
    <tr>
      <StyledMergeMatrixTh/>
      {
        props.entities.map((entity, idx) => {
          const attributes = {}
          if (!isTargetEntity(entity.pk)) {
            attributes.title = props.intl.formatMessage({id: 'client.merge.selectTargetTitle'})
          }

          return (
            <StyledMergeMatrixTh
              bold
              onClick={() => { if (!isTargetEntity(entity.pk)) props.changeTargetEntity(entity.pk) }}
              key={'th' + idx}
              {...attributes}
              selected={isTargetEntity(entity.pk)}>
              <Icon
                icon="crosshairs"
                position={design.position.PREPEND}/>
              <Typography.B>{entity.label}</Typography.B>
            </StyledMergeMatrixTh>
          )
        })
      }
    </tr>
  )
}

HeaderRow.propTypes = {
  intl: intlShape.isRequired,
  entities: PropTypes.array.isRequired,
  changeTargetEntity: PropTypes.func.isRequired,
  targetEntityPk: PropTypes.string.isRequired
}

export default HeaderRow
