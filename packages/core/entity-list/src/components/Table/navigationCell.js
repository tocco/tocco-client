import PropTypes from 'prop-types'
import {Icon} from 'tocco-ui'

import NavigationCellHeader from './NavigationCellHeaderContainer'

const CellRenderer = ({showNavigation, rowData, navigationStrategy, parent}) =>
  showNavigation && navigationStrategy.DetailLinkRelative ? (
    <span onClick={e => e.stopPropagation()} data-cy="list-navigation-arrow">
      <navigationStrategy.DetailLinkRelative
        entityKey={rowData.__key}
        entityModel={rowData.__model}
        {...(parent && parent.relationName && {relation: parent.relationName})}
      >
        <Icon icon="arrow-right" />
      </navigationStrategy.DetailLinkRelative>
    </span>
  ) : null

CellRenderer.propTypes = {
  rowData: PropTypes.shape({
    __key: PropTypes.string.isRequired,
    __model: PropTypes.string.isRequired
  }).isRequired,
  showNavigation: PropTypes.bool.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLinkRelative: PropTypes.func
  }).isRequired,
  parent: PropTypes.shape({
    relationName: PropTypes.string
  })
}

export const navigationCell = (showNavigation, navigationStrategy, parent) => ({
  id: 'navigation-column',
  fixedPosition: true,
  width: 30,
  resizable: false,
  dynamic: false,
  HeaderRenderer: NavigationCellHeader,
  CellRenderer: props => (
    <CellRenderer {...props} showNavigation={showNavigation} navigationStrategy={navigationStrategy} parent={parent} />
  )
})
