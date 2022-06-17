import _get from 'lodash/get'
import PropTypes from 'prop-types'
import {call} from 'redux-saga/effects'
import {rest, form} from 'tocco-app-extensions'
import EntityBrowserApp from 'tocco-entity-browser/src/main'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/main'
import {appContext as appContextPropType} from 'tocco-util'

function* modifyFormDefinition(formDefinition, {entityName, entityId}) {
  if (entityId && entityName === 'User') {
    const user = yield call(rest.fetchEntity, entityName, entityId, {paths: ['publish_detail']})
    const publishDetail = _get(user, ['paths', 'publish_detail', 'value'])
    if (!publishDetail) {
      return yield form.removeBoxes(formDefinition, ['address_information', 'communication_information'])
    }
  }

  return yield formDefinition
}

const MailingList = ({searchFilters, searchFormType, limit, backendUrl, businessUnit, appContext}) => {
  return (
    <EntityBrowserApp
      entityName="Event"
      formBase="Mailing_list"
      searchFilters={searchFilters}
      limit={limit}
      modifyFormDefinition={modifyFormDefinition}
      backendUrl={backendUrl}
      businessUnit={businessUnit}
      appContext={appContext}
      searchFormType={searchFormType}
    />
  )
}

MailingList.propTypes = {
  searchFormType: searchFormTypePropTypes,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContextPropType.propTypes.isRequired
}

export default MailingList
