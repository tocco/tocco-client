import React from 'react'
import PropTypes from 'prop-types'

import {StyledMenuEntry, StyledMenuEntryWrapper} from './StyledComponents'

const MenuItem = ({
  item,
  typeMapping
}) => {
  if (!item) {
    return null
  }

  const mappedType = typeMapping[item.menuType]
  if (!mappedType) {
    return null
  }

  const Component = mappedType.component
  const MenuItems = item.children?.map((child, idx) =>
    <MenuItem key={child.name} item={child} typeMapping={typeMapping}/>)

  return (
    <StyledMenuEntry {...item} childrenCount={item.children?.length || 0} data-cy={`admin-menuitem-${item.name}`}>
      <Component item={item} {...mappedType.props}/>
      {MenuItems}
    </StyledMenuEntry>
  )
}

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    menuType: PropTypes.string,
    children: PropTypes.array
  }),
  typeMapping: PropTypes.objectOf(
    PropTypes.shape({
      component: PropTypes.func,
      filterAttribute: PropTypes.arrayOf(PropTypes.string)
    })
  )
}

const prepareTree = (item, searchFilter, typeMapping, level = 0) => {
  const mappedType = typeMapping[item.menuType]

  if (!mappedType) {
    return null
  }

  const children = (item.children || [])
    .map(child => prepareTree(child, searchFilter, typeMapping, level + 1))
    .filter(c => c !== null)

  let matchingAttribute
  if (children.length === 0 && searchFilter) {
    matchingAttribute = mappedType.filterAttributes
      .find(filterAttribute =>
        item[filterAttribute]
        && item[filterAttribute].toLowerCase().includes(searchFilter.toLowerCase())
      )
    if (!matchingAttribute) {
      return null
    }
  }

  return {
    ...item,
    level,
    children,
    matchingAttribute
  }
}

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

  const MenuItems = items.map(item => (
    <MenuItem
      key={item.name}
      item={prepareTree(item, searchFilter, typeMapping)}
      typeMapping={typeMapping}/>
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
      component: PropTypes.func,
      filterAttribute: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  requireSearch: PropTypes.bool
}

export default React.memo(MenuTree)
