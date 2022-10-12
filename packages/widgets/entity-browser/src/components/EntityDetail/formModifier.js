import {call} from 'redux-saga/effects'
import {form} from 'tocco-app-extensions'

/**
 * adds back button if needed
 */
export function* modifyFormDefinition(formDefinition, context, props) {
  const {detailParams = {}, intl, modifyFormDefinition: customModifyFormDefinition} = props
  const modifiedFormDefinition = customModifyFormDefinition
    ? yield call(customModifyFormDefinition, formDefinition, context)
    : formDefinition

  const {entityName: formEntityName, entityId: formEntityId} = context || {}
  const {entityName, entityId, showBackButton} = detailParams
  // only show back button on main action bar from entity detail and not in subtables
  const shouldAddBackButton = showBackButton && formEntityName === entityName && formEntityId === entityId

  return shouldAddBackButton ? form.addBack(modifiedFormDefinition, intl) : modifiedFormDefinition
}
