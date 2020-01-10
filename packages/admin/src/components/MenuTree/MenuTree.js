import React from 'react'
import PropTypes from 'prop-types'
import {declareFont, theme} from 'tocco-ui'
import styled from 'styled-components'

const StyledMenuEntry = styled.div`
  ${declareFont()}
  && {
   padding-left: ${props => props.level * 6}px;
   line-height: ${theme.lineHeight('light')};
 }
`

const StyledMenuEntryWrapper = styled.div`
  > div:not(:first-child) {
    margin-top: .9rem;
  }
`

const MenuItem = ({item, typeMapping}) => {
  if (!item) {
    return null
  }

  const mappedType = typeMapping[item.menuType]
  if (!mappedType) {
    return null
  }

  const Component = mappedType.component
  return <StyledMenuEntry {...item}>
    <Component item={item} {...mappedType.props}/>
    {item.children && item.children.map(child => <MenuItem key={child.name} item={child} typeMapping={typeMapping} />)}
  </StyledMenuEntry>
}

MenuItem.propTypes = {
  item: PropTypes.shape({
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
    .filter(c => (c !== null))

  let matchingAttribute
  if (children.length === 0 && searchFilter) {
    matchingAttribute = mappedType.filterAttributes
      .find(filterAttribute => item[filterAttribute].toLowerCase().includes(searchFilter.toLowerCase()))

    if (!matchingAttribute) {
      return null
    }
  }

  return {...item, level, children, matchingAttribute}
}

const MenuTree = ({items, searchFilter, typeMapping}) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <StyledMenuEntryWrapper>
      {items.map(item => (
        <MenuItem
          key={item.name}
          item={prepareTree(item, searchFilter, typeMapping)}
          typeMapping={typeMapping}/>
      ))}
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
  )
}

export default React.memo(MenuTree)
