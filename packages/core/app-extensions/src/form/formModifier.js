export const MAIN_ACTION_BAR_ID = 'main-action-bar'
export const ACTION_GROUP_CREATECOPY_ID = 'createcopy'
export const ACTION_DELETE_ID = 'delete'
export const ACTION_SAVE_ID = 'save'
export const ACTION_GROUP_OUTPUT_ID = 'output'
export const ACTION_GROUP_ACTIONS_ID = 'actions'

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
export const addReports = (formDefinition, reports, intl) => {
  formDefinition = addOutputGroup(formDefinition, intl)

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
 * add output group to main action bar if it not already exists
 */
export const addOutputGroup = (formDefinition, intl) => {
  const outputGroup = {
    id: ACTION_GROUP_OUTPUT_ID,
    label: intl.formatMessage({id: 'client.actions.show-output-jobs-action.title'}),
    componentType: 'action-group',
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