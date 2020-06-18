import React from 'react'
import {actions, form} from 'tocco-app-extensions'
import {FormattedValue} from 'tocco-ui'

import fieldFactory from './fieldFactory'
import LazyDataCell from '../components/LazyDataEnhancer'

export default (field, entity, parent, cb, intl) => {
  const {componentType} = field

  if (actions.isAction(componentType)) {
    return getAction(field, entity, parent, cb)
  } else if (componentType === form.componentTypes.FIELD) {
    return fieldFactory(field, entity, intl)
  } else if (componentType === form.componentTypes.DISPLAY) {
    return getDisplayExpression(field, entity, cb)
  }
}

const getDisplayExpression = (field, entity) => {
  return <span key={field.id}>

    <LazyDataCell
      path={field.id}
      entityKey={entity.__key}
      type={'displayExpression'}
      value={null}
    >
      <FormattedValue type="html" breakWords={false} value={entity[field.id]}/>
    </LazyDataCell>

  </span>
}

const getAction = (field, entity, parent, cb) =>
  <actions.Action
    key={'tableAction' + field.id}
    definition={field}
    selection={actions.getSingleEntitySelection(entity.__model, entity.__key)}
    callback={result =>
      cb.refresh()
    }
    parent={parent}
  />
