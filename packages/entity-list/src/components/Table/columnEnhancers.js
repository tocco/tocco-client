/* eslint-disable react/prop-types */
import React from 'react'
import {MultiCheckbox, Icon} from 'tocco-ui'

import selectionStyles from '../../util/selectionStyles'

export default [

  {
    shouldApply: ({linkFactory, showLink}) => linkFactory && linkFactory.detail && showLink,
    apply: columns => {
      return [
        {
          id: 'navigation-link',
          width: '30px',
          resizable: false,
          dynamic: false,
          headerRender: () => null,
          cellRenderer: (entity, {linkFactory}) => {
            return <span onClick={e => e.stopPropagation()}>
              {linkFactory.detail(null, null, entity.__key, <Icon icon="arrow-right"/>)}
            </span>
          }
        }, ...columns]
    }
  },
  {
    shouldApply: ({tableSelectionStyle}) => tableSelectionStyle === selectionStyles.MULTI,
    apply: columns => {
      return [{
        id: 'multi-selection',
        dynamic: true,
        resizable: false,
        width: '30px',
        headerRender: ({entities, selection, onSelectChange}) => {
          const allRowsSelectionChange = v => { onSelectChange(allKeys, v === 'checked') }
          const allKeys = entities.map(e => e.__key)
          const allRowsSelectionState = allKeys.every(k => selection.includes(k))
            ? 'checked' : allKeys.some(k => selection.includes(k))
              ? 'indeterminate'
              : 'unchecked'

          return entities.length === 0
            ? null
            : <MultiCheckbox value={allRowsSelectionState} onChange={allRowsSelectionChange}/>
        },
        cellRenderer: (entity, {selection, onSelectChange}) => {
          const rowSelectionState = entity => selection.includes(entity.__key) ? 'checked' : 'unchecked'
          const rowSelectionChange = entity => value => { onSelectChange([entity.__key], value === 'checked') }

          return <div onClick={e => e.stopPropagation()}>
            <MultiCheckbox value={rowSelectionState(entity)} onChange={rowSelectionChange(entity)}/>
          </div>
        }
      }, ...columns]
    }
  },
  {
    shouldApply: ({tableSelectionStyle}) => tableSelectionStyle === selectionStyles.SINGLE,
    apply: columns => {
      return [{
        id: 'single-selection',
        width: '30px',
        resizable: false,
        dynamic: true,
        headerRender: () => null,
        cellRenderer: (entity, {onSelectChange, selection}) => {
          return <div onClick={e => e.stopPropagation()}>
            <input type="radio" checked={selection.includes(entity.__key)} onChange={e => {
              onSelectChange([entity.__key], e.target.value)
            }}/>
          </div>
        }
      }, ...columns]
    }
  }
]
