export const MAIN_ACTION_BAR_ID = 'main-action-bar'
export const ACTION_BAR_TYPE = 'action-bar'
export const ACTION_GROUP_TYPE = 'action-group'
export const ACTION_TYPE = 'action'
export const LAYOUT_TYPE = 'layout'
export const ACTION_GROUP_CREATECOPY_ID = 'createcopy'
export const ACTION_DELETE_ID = 'delete'
export const ACTION_SAVE_ID = 'save'
export const ACTION_GROUP_OUTPUT_ID = 'output'
export const ACTION_GROUP_ACTIONS_ID = 'actions'

export const removeBoxes = (formDefinition, boxIds) => ({
  ...formDefinition,
  children: formDefinition.children
    .filter(item => item.componentType !== LAYOUT_TYPE || !boxIds.includes(item.id))
    .map(item => {
      if (item.componentType === LAYOUT_TYPE) {
        return removeBoxes(item, boxIds)
      }

      return item
    })
})

export const removeActions = (container, actionIds) => adjustActions(container, actionIds, () => false)

/**
 * looks for any actions whose id is contained in `actionIds` and then runs `adjuster` to change the actions.
 *
 * handles actions at any depth of action bar and group combination.
 * be sure to return a full action definition from your own adjustement function.
 * working with object destructuring is recommended for ease of use.
 * actions can be removed by returning any falsy value from the adjustment function.
 * any empty containers are removed after adjustement.
 */
export const adjustActions = (container, actionIds, adjuster) => ({
  ...container,
  children: container.children
    .map(child => {
      if (child.componentType === ACTION_BAR_TYPE || child.componentType === ACTION_GROUP_TYPE) {
        return adjustActions(child, actionIds, adjuster)
      }
      return child
    })
    .map(child => {
      if (child.componentType === ACTION_TYPE && actionIds.includes(child.id)) {
        return adjuster(child)
      }
      return child
    })
    .filter(child => child)
    .filter(
      child =>
        (child.componentType !== ACTION_BAR_TYPE && child.componentType !== ACTION_GROUP_TYPE) ||
        child.children?.length > 0
    )
})

/**
 * remove create action group from main action bar
 */
export const removeCreate = formDefinition => ({
  ...formDefinition,
  children: formDefinition.children.map(rootItem => {
    if (rootItem.id === MAIN_ACTION_BAR_ID) {
      return {
        ...rootItem,
        children: rootItem.children.filter(item => item.id !== ACTION_GROUP_CREATECOPY_ID)
      }
    }

    return rootItem
  })
})

/**
 * add reports to form definition (use reports helper of app-extensions to create correct format of reports parameter)
 */
export const addReports = (formDefinition, reports, outputGroupLabel) => {
  if (reports?.length === 0) {
    return formDefinition
  }

  formDefinition = addMainActionBar(formDefinition)
  formDefinition = addOutputGroup(formDefinition, outputGroupLabel)

  return {
    ...formDefinition,
    children: formDefinition.children.map(rootItem => {
      if (rootItem.id === MAIN_ACTION_BAR_ID) {
        return {
          ...rootItem,
          children: rootItem.children.map(item => {
            if (item.id === ACTION_GROUP_OUTPUT_ID) {
              return {
                ...item,
                children: [...item.children, ...reports]
              }
            }

            return item
          })
        }
      }

      return rootItem
    })
  }
}

/**
 * add main action bar if it not already exists
 */
export const addMainActionBar = formDefinition => {
  const mainActionBarExists = formDefinition.children.filter(rootItem => rootItem.id === MAIN_ACTION_BAR_ID).length > 0

  if (mainActionBarExists) {
    return formDefinition
  } else {
    const mainActionBar = {
      id: MAIN_ACTION_BAR_ID,
      componentType: ACTION_BAR_TYPE,
      children: []
    }
    return {
      ...formDefinition,
      children: [mainActionBar, ...formDefinition.children]
    }
  }
}

/**
 * add output group to main action bar if it not already exists
 */
export const addOutputGroup = (formDefinition, outputGroupLabel) => {
  const outputGroup = {
    id: ACTION_GROUP_OUTPUT_ID,
    label: outputGroupLabel,
    componentType: ACTION_GROUP_TYPE,
    icon: 'file-export',
    children: []
  }

  return {
    ...formDefinition,
    children: formDefinition.children.map(rootItem => {
      if (rootItem.id === MAIN_ACTION_BAR_ID) {
        if (!hasOutputGroup(rootItem)) {
          const beforeGroupId = getGroupIdBeforeOutputGroup(rootItem)

          return {
            ...rootItem,
            children: beforeGroupId
              ? rootItem.children
                  .reduce((acc, value) => [...acc, value, value.id === beforeGroupId ? outputGroup : null], [])
                  .filter(i => i)
              : [outputGroup, ...rootItem.children]
          }
        }
      }

      return rootItem
    })
  }
}

/**
 * check if main action bar has an output group
 */
const hasOutputGroup = mainActionBar =>
  mainActionBar.children.map(c => c.id).filter(id => id === ACTION_GROUP_OUTPUT_ID).length > 0

/**
 * get group id of action group before output group.
 * If all possible action groups before the output group does not exist return null
 */
const getGroupIdBeforeOutputGroup = mainActionBar => {
  for (const beforeGroupId of [ACTION_SAVE_ID, ACTION_DELETE_ID, ACTION_GROUP_CREATECOPY_ID]) {
    const found = mainActionBar.children.map(c => c.id).find(id => id === beforeGroupId)
    if (found) {
      return found
    }
  }

  return null
}
