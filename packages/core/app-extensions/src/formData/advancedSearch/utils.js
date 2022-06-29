import AdvancedSearchContainer from './AdvancedSearchContainer'

export const getSelection = (value, multi) => {
  if (value) {
    return multi ? value.map(v => v.key) : [value.key]
  }
  return []
}

export const getValue = (entities, multi) => {
  if (multi) {
    return entities
  }

  return entities.length > 0
    ? {
        key: entities[0].key,
        display: entities[0].display
      }
    : null
}

export const getAdvancedSearchComponent =
  (
    listApp,
    entity,
    formName,
    listFormDefinition,
    selection,
    onSelectionChange,
    onOkClick,
    fieldId,
    multi,
    constriction
  ) =>
  () =>
    (
      <AdvancedSearchContainer
        ListApp={listApp}
        entityName={entity}
        formName={formName}
        listFormDefinition={listFormDefinition}
        selection={selection}
        onSelectionChange={onSelectionChange}
        onOkClick={onOkClick}
        field={fieldId}
        multi={multi}
        constriction={constriction}
      />
    )
