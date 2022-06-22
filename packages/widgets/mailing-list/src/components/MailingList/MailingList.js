import _get from 'lodash/get'
import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {rest, form} from 'tocco-app-extensions'
import EntityBrowserApp from 'tocco-entity-browser/src/main'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/main'
import {LoadMask} from 'tocco-ui'
import {appContext as appContextPropType} from 'tocco-util'

function* modifyFormDefinition(
  formDefinition,
  {parent, entityName, entityId},
  {reports, intl, showEmailAction, appContext}
) {
  if (formDefinition.id === 'Mailing_list_detail_relUser_list') {
    let userListFormDefinition = formDefinition
    if (reports?.length > 0) {
      userListFormDefinition = form.addReports(userListFormDefinition, reports, intl)
    }
    if (!showEmailAction) {
      userListFormDefinition = form.removeActions(userListFormDefinition, ['mailingListMailAction'])
    } else {
      userListFormDefinition = form.adjustAction(userListFormDefinition, 'mailingListMailAction', action => ({
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

  if (entityId && entityName === 'User') {
    const user = yield rest.fetchEntity(entityName, entityId, {paths: ['publish_detail']})
    const publishDetail = _get(user, ['paths', 'publish_detail', 'value'])
    if (!publishDetail) {
      return form.removeBoxes(formDefinition, ['address_information', 'communication_information'])
    }
  }

  return formDefinition
}

const MailingList = props => {
  const {searchFilters, searchFormType, limit, backendUrl, businessUnit, appContext, loadReports, reportIds, reports} =
    props
  useEffect(() => {
    loadReports(reportIds)
  }, [loadReports, reportIds])

  return (
    <LoadMask required={[reports]}>
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
      />
    </LoadMask>
  )
}

MailingList.propTypes = {
  searchFormType: searchFormTypePropTypes,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContextPropType.propTypes.isRequired,
  loadReports: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(PropTypes.object),
  reportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  intl: PropTypes.object.isRequired,
  showEmailAction: PropTypes.bool
}

export default MailingList
