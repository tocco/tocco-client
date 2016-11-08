import React from 'react'
import {intlShape} from 'react-intl'

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
              onClick={function() { if (!isTargetEntity(entity.pk)) props.changeTargetEntity(entity.pk) }}
              key={'th' + idx}
              {...attributes}
              className={cls}
            >
              <span className="glyphicon glyphicon-screenshot merge-icon-spacer targetIcon"/>
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
  entities: React.PropTypes.array.isRequired,
  changeTargetEntity: React.PropTypes.func.isRequired,
  targetEntityPk: React.PropTypes.string.isRequired
}

export default HeaderRow
