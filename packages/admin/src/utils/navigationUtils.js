export const getMenuPreferencesKey = (preferencesPrefix, menuTreePath) =>
  `admintree${preferencesPrefix ? `.${preferencesPrefix}` : ''}.${menuTreePath}.collapsed`

/**
 * Gets flat preferences object for complete menu tree
 * @param {array} items - menu tree items
 * @param {string} preferencesPrefix - prefix for admintree preferences
 * @param {boolean} collapse
 * @returns {object} - flat prefrences object
 */
export const getCompleteMenuPreferences = (items, preferencesPrefix, collapse) => {
  if (!items || items.length === 0) {
    return {}
  }

  const preferences = items.reduce((acc, item) => {
    const {name} = item

    const hasChildren = item.children && item.children.length > 0
    const children = getCompleteMenuPreferences(
      item.children || [],
      `${preferencesPrefix}${preferencesPrefix ? `.${name}` : name}`,
      collapse
    )

    const key = getMenuPreferencesKey(preferencesPrefix, name)
    return {
      ...acc,
      ...children,
      ...(hasChildren ? {[key]: collapse} : {})
    }
  }, {})
  return preferences
}

/**
 * Preparing the actual visible menu tree:
 *  - Applying the `searchFilter` and removing items which are not matching
 *    - When a parent is matching all children get included
 *    - When a parent has at least one matching child the parent gets included
 *  - Add `level` field on each item
 *  - Add `matchingAttribute` field on each item
 *    - This includes the name of the field that is matching with the `searchFilter`
 *
 * @param {array} items - available items
 * @param {string} searchFilter - user search input
 * @param {object} typeMapping - menu entry type map configuration
 * @param {number} level - current level of tree (Default: 0)
 * @param {boolean} isParentMatching - true when parent item is matching (Default: false)
 * @returns {array} items - actual visible items for complete menu tree
 */
export const prepareMenuTree = (items, searchFilter, typeMapping, level = 0, isParentMatching = false) => {
  const includeInTree = item => !searchFilter || item.matchingAttribute || item.children?.length > 0 || isParentMatching

  const getMatchingAttribute = (item, filterAttributes) =>
    searchFilter
      ? filterAttributes.find(attr => item[attr] && item[attr].toLowerCase().includes(searchFilter?.toLowerCase()))
      : undefined

  return items
    .map(item => {
      const mappedType = typeMapping[item.menuType] || {}
      const {filterAttributes = []} = mappedType
      const matchingAttribute = getMatchingAttribute(item, filterAttributes)

      const itemMatching = Boolean(matchingAttribute)

      const children = prepareMenuTree(item.children || [], searchFilter, typeMapping, level + 1, itemMatching)

      return {
        ...item,
        matchingAttribute,
        children,
        level
      }
    })
    .filter(includeInTree)
}
