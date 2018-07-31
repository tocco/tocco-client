import React from 'react'
import AdvancedSearch from './AdvancedSearch'

export const getSelection = (value, multi) => value ? multi ? value.map(v => v.key) : [value.key] : []

export const getValue = (entities, multi) =>
  multi ? entities : (entities.length > 0 ? {
    key: entities[0].key,
    display: entities[0].display
  } : null)

export const getAdvancedSearchComponent
  = (listApp, entity, formBase, selection, onSelectionChange, onOkClick, fieldId, multi) =>
    () =>
      <AdvancedSearch
        ListApp={listApp}
        entityName={entity}
        formBase={formBase}
        selection={selection}
        onSelectionChange={onSelectionChange}
        onOkClick={onOkClick}
        field={fieldId}
        multi={multi}
      />
