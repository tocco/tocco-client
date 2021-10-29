import React from 'react'
import PropTypes from 'prop-types'

import {StyledMenuEntry} from './StyledComponents'

const MenuItem = ({
  item,
  menuTreePath = '',
  typeMapping
}) => {
  const mappedType = typeMapping[item.menuType]
  if (!mappedType) {
    return null
  }

  const Component = mappedType.component
  const ChildrenWrapperComponent = mappedType.childrenWrapperComponent
  const MenuItems = item.children?.map(child => (<MenuItem
    key={child.name}
    item={child}
    typeMapping={typeMapping}
    menuTreePath={`${menuTreePath}.${child.name}`}
  />))

  return (
    <StyledMenuEntry {...item} childrenCount={item.children?.length || 0} data-cy={`admin-menuitem-${item.name}`}>
      <Component item={item} menuTreePath={menuTreePath} {...mappedType.props}/>
      {MenuItems?.length > 0 && (
        <ChildrenWrapperComponent item={item} menuTreePath={menuTreePath} {...mappedType.props}>
          {MenuItems}
        </ChildrenWrapperComponent>)}
    </StyledMenuEntry>
  )
}

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    menuType: PropTypes.string,
    children: PropTypes.array,
    level: PropTypes.number
  }).isRequired,
  menuTreePath: PropTypes.string,
  typeMapping: PropTypes.objectOf(
    PropTypes.shape({
      component: PropTypes.elementType.isRequired,
      childrenWrapperComponent: PropTypes.elementType.isRequired,
      filterAttribute: PropTypes.arrayOf(PropTypes.string),
      props: PropTypes.object
    })
  )
}

export default MenuItem
