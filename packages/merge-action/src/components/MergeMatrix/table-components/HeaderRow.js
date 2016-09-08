import React from 'react'

const HeaderRow = props => {
  var isTargetEntity = pk => pk === props.targetEntityPk

  return (
    <tr>
      <th/>
      {
        props.entities.map((entity, idx) => {
          var cls = isTargetEntity(entity.pk) ? 'merger-matrix-selected-th' : 'merger-matrix-th'
          return (
            <th onClick={function() { props.changeTargetEntity(entity.pk) }} key={'th' + idx}>
              <span className={'glyphicon glyphicon-screenshot merger-icon-spacer ' + cls}/>
              <span>{entity.label}</span>
            </th>
          )
        })
      }
    </tr>
  )
}

HeaderRow.propTypes = {
  entities: React.PropTypes.array.isRequired,
  changeTargetEntity: React.PropTypes.func.isRequired,
  targetEntityPk: React.PropTypes.string.isRequired
}

export default HeaderRow
