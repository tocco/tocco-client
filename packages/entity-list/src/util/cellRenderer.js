import React from 'react'
import {actions, form} from 'tocco-util'
import {FormattedValue} from 'tocco-ui'
import formattedValueFactory from './formattedValueFactory'

export default (field, entity, cb, intl) => {
  const {componentType} = field

  if (actions.isAction(componentType)) {
    return getAction(field, entity)
  } else if (componentType === form.componentTypes.FIELD) {
    return formattedValueFactory(field, entity, intl)
  } else if (componentType === form.componentTypes.DISPLAY) {
    return getDisplayExpression(field, entity, cb)
  }
}

const getDisplayExpression = (field, entity) =>
  <span key={field.id}>
    <FormattedValue type="html" value={entity[field.id].value}/>
  </span>

const getAction = (field, entity, cb) =>
  <actions.Action
    key={'tableAction' + field.id}
    definition={field}
    ids={[entity.__key]}
    entity={entity.__model}
    callback={result =>
      cb.refresh()
    }
  />
