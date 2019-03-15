import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {Icon, design} from 'tocco-ui'

const HeaderRow = props => {
  const isTargetEntity = pk => pk === props.targetEntityPk

  return (
    <tr>
      <th/>
      {
        props.entities.map((entity, idx) => {
          const cls = isTargetEntity(entity.pk) ? 'merge-matrix-th-selected' : 'merge-matrix-th'
          const attributes = {}
          if (!isTargetEntity(entity.pk)) {
            attributes.title = props.intl.formatMessage({id: 'client.merge.selectTargetTitle'})
          }

          return (
            <th
              onClick={() => { if (!isTargetEntity(entity.pk)) props.changeTargetEntity(entity.pk) }}
              key={'th' + idx}
              {...attributes}
              className={cls}
            >
              <span className="targetIcon">
                <Icon
                  icon="crosshairs"
                  position={design.position.PREPEND}
                />
              </span>
              <span>{entity.label}</span>
            </th>
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
