/* eslint-disable react/prop-types */
import React from 'react'
import {MultiCheckbox, Icon} from 'tocco-ui'

import selectionStyles from '../../util/selectionStyles'

const navigationCell = {
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
}
const multiSelectionCell = {
  shouldApply: ({tableSelectionStyle}) => tableSelectionStyle === selectionStyles.MULTI,
  apply: columns => {
    return [{
      id: 'multi-selection',
      dynamic: true,
      resizable: false,
      width: '30px',
      headerRender: ({entities, multiSelectHandler, isSelected}) => {
        const allRowsSelectionChange = v => { multiSelectHandler(allKeys, v === 'checked') }
        const allKeys = entities.map(e => e.__key)

        const allRowsSelectionState = allKeys.every(k => isSelected(k))
          ? 'checked' : allKeys.some(k => isSelected(k))
            ? 'indeterminate'
            : 'unchecked'

        return entities.length === 0
          ? null
          : <MultiCheckbox value={allRowsSelectionState} onChange={allRowsSelectionChange}/>
      },
      cellRenderer: (entity, {isSelected, singleSelectHandler}) => {
        const rowSelectionState = entity => isSelected(entity.__key) ? 'checked' : 'unchecked'
        const rowSelectionChange = entity => value => { singleSelectHandler(entity.__key, value === 'checked') }

        return <div onClick={e => {
          if (e.shiftKey) {
            singleSelectHandler(entity.__key, true, true)
          }
          e.stopPropagation()
        }
        }>
          <MultiCheckbox value={rowSelectionState(entity)} onChange={rowSelectionChange(entity)}/>
        </div>
      }
    }, ...columns]
  }
}

const singleSelectionCell = {
  shouldApply: ({tableSelectionStyle}) => tableSelectionStyle === selectionStyles.SINGLE,
  apply: columns => {
    return [{
      id: 'single-selection',
      width: '30px',
      resizable: false,
      dynamic: true,
      headerRender: () => null,
      cellRenderer: (entity, {isSelected, singleSelectHandler}) => {
        return <div onClick={e => e.stopPropagation()}>
          <input type="radio" checked={isSelected(entity.__key)} onChange={e => {
            singleSelectHandler(entity.__key, e.target.value)
          }}/>
        </div>
      }
    }, ...columns]
  }
}

export default [navigationCell, multiSelectionCell, singleSelectionCell]
