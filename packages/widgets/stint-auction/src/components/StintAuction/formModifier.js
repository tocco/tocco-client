import {form} from 'tocco-app-extensions'

export function modifyFormDefinition(formDefinition, appContext) {
  if (formDefinition.id === 'Stint_auction_detail') {
    // allows action to read widget config we're on
    return form.adjustActions(formDefinition, 'stintAuctionRegisterLecturer', action => ({
      ...action,
      properties: {
        ...action.properties,
        widgetKey: appContext.widgetConfigKey
      }
    }))
  }

  return formDefinition
}
