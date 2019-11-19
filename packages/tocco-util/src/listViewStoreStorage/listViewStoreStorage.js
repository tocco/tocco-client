const stores = []

/**
 * Removes all stores.
 */
export const clear = () => {
  stores.length = 0
}

/**
 * Removes all stores below a certain level. The store at the given leven is not removed.
 *
 * @param level
 */
export const removeStoresBelow = level => {
  stores.length = level + 1
}

/**
 * Set the list store of a certain level so that it can be fetched again, once the user navigates back
 * to the list view.
 *
 * This also removes all stores below the given level.
 *
 * Examples:
 * - navigates to `/e/User/list`: store for User list is stored at index 0
 * - navigates to `/e/User/1/relRecipient_email_archive/list`: store for Email_archive list is stored at index 1
 *
 * @param level The level of the list view store (starting at 0)
 * @param path The URL of the list view
 * @param store The store to cache
 */
export const setStore = (level, path, store) => {
  removeStoresBelow(level)

  stores[level] = {
    path,
    store
  }
}

/**
 * Get the store of a certain level to render the list view in the same state as the user left it.
 * If the given path does not match the stored path, `null` is returned.
 *
 * @param level The level of the list view store (starting at 0)
 * @param path The URL of the view to be rendered (to make sure the store matches)
 * @returns the cached store or null if it wasn't found or if the path doesn't match.
 */
export const getStore = (level, path) => {
  const levelStore = stores[level]

  if (!levelStore || levelStore.path !== path) {
    return null
  }

  return levelStore.store
}
