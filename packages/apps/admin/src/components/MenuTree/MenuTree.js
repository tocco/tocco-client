import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Icon} from 'tocco-ui'

import {prepareMenuTree} from '../../utils/navigationUtils'
import MenuItem from './MenuItem'
import {
  StyledExtendedSearchWrapper,
  StyledTitle,
  StyledMenuEntryWrapper,
  StyledMenuItemsWrapper,
  StyledNoSearchResultsTxt,
  StyledIconTitleWrapper,
  StyledIconWrapper
} from './StyledComponents'

const MenuTree = ({items, extendedSearchItems, searchFilter, typeMapping, requireSearch}) => {
  if (requireSearch && !searchFilter) {
    return null
  }

  if (!items || items.length === 0) {
    return null
  }

  const actualItems = prepareMenuTree(items, searchFilter, typeMapping)
  const actualExtendedSearchItems = extendedSearchItems
    ? prepareMenuTree(extendedSearchItems, searchFilter, typeMapping)
    : []

  const MenuItems = actualItems.map((item, index) => (
    <MenuItem key={index} item={item} typeMapping={typeMapping} menuTreePath={item.name} />
  ))

  const ExtendedSearchMenuItems = actualExtendedSearchItems.map((item, index) => (
    <MenuItem key={index} item={item} typeMapping={typeMapping} menuTreePath={item.name} />
  ))

  const showExtendedSearch = searchFilter && actualItems.length === 0
  const hasExtendedSearchResult = actualExtendedSearchItems.length > 0
  const ExtendedSearch = (
    <StyledExtendedSearchWrapper data-cy="extended-search-wrapper">
      <StyledNoSearchResultsTxt>
        <FormattedMessage id="client.admin.navigation.noResults" />
      </StyledNoSearchResultsTxt>
      {hasExtendedSearchResult && (
        <>
          <StyledIconTitleWrapper>
            <StyledIconWrapper>
              <Icon icon="lightbulb-exclamation" />
            </StyledIconWrapper>
            <StyledTitle>
              <FormattedMessage id="client.admin.navigation.moreResults" />
            </StyledTitle>
          </StyledIconTitleWrapper>
          <StyledMenuItemsWrapper>{ExtendedSearchMenuItems}</StyledMenuItemsWrapper>
        </>
      )}
    </StyledExtendedSearchWrapper>
  )

  return (
    <StyledMenuEntryWrapper data-cy="menu-entry-wrapper">
      {MenuItems}
      {showExtendedSearch && ExtendedSearch}
    </StyledMenuEntryWrapper>
  )
}

MenuTree.propTypes = {
  items: PropTypes.array,
  extendedSearchItems: PropTypes.array,
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
