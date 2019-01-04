import React from 'react'
import {actions, form} from 'tocco-app-extensions'
import {FormattedValue} from 'tocco-ui'

import formattedValueFactory from './formattedValueFactory'

export default (field, entity, parent, cb, intl) => {
  const {componentType} = field

  if (actions.isAction(componentType)) {
    return getAction(field, entity, parent, cb)
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

const getAction = (field, entity, parent, cb) =>
  <actions.Action
    key={'tableAction' + field.id}
    definition={field}
    selection={{
      mode: 'ID',
      ids: [entity.__key]
    }}
    entity={entity.__model}
    callback={result =>
      cb.refresh()
    }
    parent={parent}
  />
