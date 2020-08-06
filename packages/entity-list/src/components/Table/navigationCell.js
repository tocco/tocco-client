import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'tocco-ui'

import NavigationCellHeader from './NavigationCellHeader'

const CellRenderer = ({rowData, linkFactory}) =>
  <span
    onClick={e => e.stopPropagation()}
    data-cy="list-navigation-arrow"
  >
    {linkFactory.detail(null, null, rowData.__key, <Icon icon="arrow-right"/>)}
  </span>

CellRenderer.propTypes = {
  rowData: PropTypes.shape({
    __key: PropTypes.string.isRequired
  }).isRequired,
  linkFactory: PropTypes.shape({
    detail: PropTypes.func.isRequired
  }).isRequired
}

export const navigationCell = linkFactory => ({
  id: 'navigation-column',
  fixedPosition: true,
  width: 30,
  resizable: false,
  dynamic: false,
  HeaderRenderer: NavigationCellHeader,
  CellRenderer: props => <CellRenderer {...props} linkFactory={linkFactory}/>
})
