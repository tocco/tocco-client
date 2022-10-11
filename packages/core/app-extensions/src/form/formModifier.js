export const MAIN_ACTION_BAR_ID = 'main-action-bar'
export const ACTION_BAR_TYPE = 'action-bar'
export const ACTION_GROUP_TYPE = 'action-group'
export const ACTION_TYPE = 'action'
export const LAYOUT_TYPE = 'layout'
export const TABLE_TYPE = 'table'
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

/**
 * remove fields by name anywhere in the form definition
 * @param {*} container the form definition (or any other container object)
 * @param {*} fieldIds the fields to remove
 * @returns a copy of the container with the fields removed
 */
export const removeFields = (container, fieldIds) =>
  removeFieldsByPredicate(container, item => fieldIds.includes(item.id))

/**
 * remove any field that match a predicate anywhere in the form definition
 * @param {*} container container the form definition (or any other container object)
 * @param {*} predicate the predicate function, receives the field as first and its container as the second parameter
 * @returns a copy of the container with the fields removed
 */
export const removeFieldsByPredicate = (container, predicate) => ({
  ...container,
  children: container.children
    .filter(
      item => item.componentType === LAYOUT_TYPE || item.componentType === TABLE_TYPE || !predicate(item, container)
    )
    .map(item => {
      if (item.componentType === LAYOUT_TYPE || item.componentType === TABLE_TYPE) {
        return removeFieldsByPredicate(item, predicate)
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
 * add create action to main action bar
 */
export const addCreate = (formDefinition, intl) => {
  if (formDefinition.id.endsWith('_create')) {
    return formDefinition
  }

  const formDefinitionWithActionBar = addMainActionBar(formDefinition)

  const create = {
    id: 'new',
    label: intl.formatMessage({id: 'client.actions.create'}),
    componentType: 'action',
    children: [],
    actionType: 'custom',
    useLabel: 'YES',
    buttonType: 'REGULAR',
    icon: 'plus'
  }

  return {
    ...formDefinitionWithActionBar,
    children: formDefinitionWithActionBar.children.map(rootItem => {
      if (rootItem.id === MAIN_ACTION_BAR_ID) {
        const createCopyExists = rootItem.children.some(c => ACTION_GROUP_CREATECOPY_ID === c.id)
        if (createCopyExists) {
          return rootItem
        } else {
          return {
            ...rootItem,
            children: [create, ...rootItem.children]
          }
        }
      }

      return rootItem
    })
  }
}

/**
 * add back button to main action bar
 */
export const addBack = (formDefinition, intl) => {
  const formDefinitionWithActionBar = addMainActionBar(formDefinition)

  const back = {
    id: 'back',
    label: intl.formatMessage({id: 'client.actions.back'}),
    componentType: 'action',
    children: [],
    actionType: 'custom',
    useLabel: 'YES',
    buttonType: 'REGULAR',
    icon: 'arrow-left'
  }

  return {
    ...formDefinitionWithActionBar,
    children: formDefinitionWithActionBar.children.map(rootItem => {
      if (rootItem.id === MAIN_ACTION_BAR_ID) {
        return {
          ...rootItem,
          children: [back, ...rootItem.children]
        }
      }

      return rootItem
    })
  }
}

/**
 * add reports to form definition (use reports helper of app-extensions to create correct format of reports parameter)
 */
export const addReports = (formDefinition, reports) => {
  if (reports?.length === 0) {
    return formDefinition
  }

  const formDefinitionWithActionBar = addMainActionBar(formDefinition)

  const actionGroupsBeforeReports = [ACTION_GROUP_CREATECOPY_ID, ACTION_DELETE_ID, ACTION_SAVE_ID]

  return {
    ...formDefinitionWithActionBar,
    children: formDefinitionWithActionBar.children.map(rootItem => {
      if (rootItem.id === MAIN_ACTION_BAR_ID) {
        return {
          ...rootItem,
          children: [
            ...rootItem.children.filter(c => actionGroupsBeforeReports.includes(c.id)),
            ...reports,
            ...rootItem.children.filter(c => !actionGroupsBeforeReports.includes(c.id))
          ]
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
