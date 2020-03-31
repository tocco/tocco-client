import React from 'react'
import {intlShape} from 'react-intl'
import PropTypes from 'prop-types'

import cellRenderer from '../../util/cellRenderer'

const StaticCell = React.memo(props => {
  const {column, rightAligned, entity, refresh, intl, parent} = props
  return <td
    {...rightAligned === true && {style: {textAlign: 'right'}}}
  >
    {column.cellRenderer
      ? column.cellRenderer(entity, props)
      : column.children.map(child => cellRenderer(child, entity, parent, {refresh}, intl))
    }
  </td>
}, props => !props.column.dynamic)

StaticCell.propTypes = {
  entity: PropTypes.object,
  column: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.object),
    cellRenderer: PropTypes.func,
    dynamic: PropTypes.bool
  }),
  rightAligned: PropTypes.bool,
  intl: intlShape.isRequired,
  refresh: PropTypes.func,
  parent: PropTypes.shape({
    key: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    reverseRelationName: PropTypes.string
  })
}

export default StaticCell
