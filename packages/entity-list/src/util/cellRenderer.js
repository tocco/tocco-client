import React from 'react'
import {actions, form} from 'tocco-app-extensions'
import {FormattedValue} from 'tocco-ui'

import fieldFactory from './fieldFactory'
import LazyDataCell from '../components/LazyDataEnhancer'
import {StyledActionWrapper} from './StyledComponents'

export default (field, entity, parent, intl) => {
  const {componentType} = field

  if (actions.isAction(componentType)) {
    return getAction(field, entity, parent)
  } else if (componentType === form.componentTypes.FIELD) {
    return fieldFactory(field, entity, intl)
  } else if (componentType === form.componentTypes.DISPLAY) {
    return getDisplayExpression(field, entity)
  }
}

const getDisplayExpression = (field, entity) =>
  <LazyDataCell
  key={'action-' + field.id}
    path={field.id}
    entityKey={entity.__key}
    type={'displayExpression'}
    value={null}
  >
    <FormattedValue type="html" breakWords={false} value={entity[field.id]}/>
  </LazyDataCell>

const getAction = (field, entity, parent) =>
  <StyledActionWrapper
   key={'action-' + field.id}
   onClick={e => {
     e.stopPropagation()
   }}
   >
    <actions.Action
      key={'tableAction' + field.id}
      definition={field}
      selection={actions.getSingleEntitySelection(entity.__model, entity.__key)}
      parent={parent}
    />
  </StyledActionWrapper>
