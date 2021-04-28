import React from 'react'

const getAllPaths = sourceData => Object.keys(sourceData.entities[0].paths)
const getAllRelations = sourceData => [...new Set(sourceData.relations.map(r => r.relationName))]

const getAllPathsAndRelations = sourceData => [...getAllPaths(sourceData), ...getAllRelations(sourceData)]

const getSortedPathsAndRelations = sourceData => {
  const counters = Object.entries(sourceData.entities[0].paths)
    .filter(([_, value]) => value.type === 'counter')
    .map(([name, _]) => name)

  const other = getAllPathsAndRelations(sourceData)
    .filter(name => !counters.includes(name))

  const sortByLabel = list => list
    .map(name => ({
      name: name,
      label: sourceData.labels[name]
    }))
    .sort((a, b) => a.label < b.label ? -1 : 1)
    .map(o => o.name)

  return [...sortByLabel(counters), ...sortByLabel(other)]
}

export const getDataRows = sourceData => {
  const pathRows = getAllPaths(sourceData).map((path, idx) => {
    return sourceData.entities.reduce((acc, e) => {
      const value = e.paths[path]

      if (value && value.value) {
        if (value.type === 'entity') {
          value.value.display = getDisplay(sourceData, value.value.model, value.value.key)
        }

        if (value.type === 'entity-list') {
          value.value = value.value.map(f => {
            f.display = getDisplay(sourceData, f.model, f.key)
            return f
          })
        }
      }
      return {
        ...acc,
        [e.key]: value
      }
    }, {__key: path})
  })

  const relationRows = getAllRelations(sourceData).map((relation, idx) => {
    return sourceData.relations
      .filter(r => r.relationName === relation)
      .reduce((acc, val) => {
        return {
          ...acc,
          [val.entityKey]: {
            type: 'relations',
            value: {
              keys: val.keys,
              totalKeys: val.totalKeys,
              relationEntity: val.relationEntity
            }
          }
        }
      }, {__key: relation})
  })

  const sorting = getSortedPathsAndRelations(sourceData)
  return [...pathRows, ...relationRows].sort((a, b) =>
    sorting.findIndex(e => e === a.__key) - sorting.findIndex(e => e === b.__key)
  )
}

export const getColumnDefinition = (sourceData, ColumnHeaderRenderer, PathCellRenderer, LabelCellRenderer) => {
  const pathColumns = sourceData.entities.map(entity => ({
    id: entity.key,
    entityKey: entity.key,
    resizable: true,
    sorting: {
      sortable: false
    },
    CellRenderer: PathCellRenderer,
    HeaderRenderer: props => <ColumnHeaderRenderer
      {...props}
      entityKey={entity.key}
      label={getDisplay(sourceData, entity.model, entity.key)}
    />
  }))

  const labelColumn = {
    id: 'column-label',
    label: '',
    resizable: true,
    sorting: {
      sortable: false
    },
    CellRenderer: props =>
      <LabelCellRenderer {...props} sourceData={sourceData} allPaths={getSortedPathsAndRelations(sourceData)}/>
  }

  return [labelColumn, ...pathColumns]
}

export const getDisplay = (sourceData, model, key) => {
  const fallbackDisplay = `PK: ${key}`
  const displaysPerModel = sourceData.displays.find(d => d.model === model)
  if (displaysPerModel === undefined) {
    return fallbackDisplay
  }

  const display = displaysPerModel.values.find(v => v.key === key)
  return display ? display.display : fallbackDisplay
}
