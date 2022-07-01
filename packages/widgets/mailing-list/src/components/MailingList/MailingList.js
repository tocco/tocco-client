import _get from 'lodash/get'
import PropTypes from 'prop-types'
import {rest, form} from 'tocco-app-extensions'
import EntityBrowserApp from 'tocco-entity-browser/src/main'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/main'
import {appContext as appContextPropType} from 'tocco-util'

export function* modifyFormDefinition(formDefinition, {parent, entityName, entityId}, {showEmailAction, appContext}) {
  if (formDefinition.id === 'Mailing_list_detail_relUser_list') {
    let userListFormDefinition = formDefinition
    if (!showEmailAction) {
      userListFormDefinition = form.removeActions(userListFormDefinition, ['mailing-list-mail-action'])
    } else {
      // allows action to read widget config and the current event we're on
      userListFormDefinition = form.adjustActions(userListFormDefinition, 'mailing-list-mail-action', action => ({
        ...action,
        properties: {
          ...action.properties,
          widgetKey: appContext.widgetConfigKey,
          eventKey: parent.key
        }
      }))
    }
    return userListFormDefinition
  }

  if (formDefinition.id === 'Mailing_list_User_detail' && entityId) {
    const user = yield rest.fetchEntity(entityName, entityId, {paths: ['publish_detail']})
    const publishDetail = _get(user, ['paths', 'publish_detail', 'value'])
    if (!publishDetail) {
      return form.removeBoxes(formDefinition, ['address_information', 'communication_information'])
    }
  }

  return formDefinition
}

const MailingList = props => {
  const {searchFilters, searchFormType, limit, backendUrl, businessUnit, appContext, reportIds} = props

  return (
    <EntityBrowserApp
      entityName="Event"
      formBase="Mailing_list"
      searchFilters={searchFilters}
      limit={limit}
      modifyFormDefinition={(formDefinition, context) => modifyFormDefinition(formDefinition, context, props)}
      backendUrl={backendUrl}
      businessUnit={businessUnit}
      appContext={appContext}
      searchFormType={searchFormType}
      reportIds={reportIds}
    />
  )
}

MailingList.propTypes = {
  searchFormType: searchFormTypePropTypes,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContextPropType.propTypes.isRequired,
  reportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  intl: PropTypes.object.isRequired,
  showEmailAction: PropTypes.bool
}

export default MailingList
