import React from 'react'
import PropTypes from 'prop-types'

import {StyledMenuEntryWrapper} from './StyledComponents'
import MenuItem from './MenuItem'
import {prepareMenuTree} from '../../utils/navigationUtils'

const MenuTree = ({
  items,
  searchFilter,
  typeMapping,
  requireSearch
}) => {
  if (requireSearch && !searchFilter) {
    return null
  }

  if (!items || items.length === 0) {
    return null
  }

  const actualItems = prepareMenuTree(items, searchFilter, typeMapping)

  const MenuItems = actualItems.map((item, index) => (
    <MenuItem
      key={index}
      item={item}
      typeMapping={typeMapping}
      menuTreePath={item.name}
    />
  ))

  return (
    <StyledMenuEntryWrapper>
      {MenuItems}
    </StyledMenuEntryWrapper>
  )
}

MenuTree.propTypes = {
  items: PropTypes.array,
  searchFilter: PropTypes.string,
  typeMapping: PropTypes.objectOf(
    PropTypes.shape({
      component: PropTypes.elementType.isRequired,
      childrenWrapperComponent: PropTypes.elementType.isRequired,
      filterAttribute: PropTypes.arrayOf(PropTypes.string),
      props: PropTypes.object
    })
  ),
  requireSearch: PropTypes.bool
}

export default React.memo(MenuTree)
