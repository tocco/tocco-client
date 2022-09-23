import PropTypes from 'prop-types'
import {form} from 'tocco-app-extensions'
import EntityBrowserApp from 'tocco-entity-browser/src/main'
import {appContext as appContextPropType} from 'tocco-util'

const UserAvailability = ({
  allowCreate,
  reportIds,
  searchFilters,
  limit,
  backendUrl,
  businessUnit,
  appContext,
  intl
}) => {
  const modifyFormDefinition = formDefinition => {
    if (allowCreate) {
      formDefinition = form.addCreate(formDefinition, intl)
    }

    return formDefinition
  }

  return (
    <EntityBrowserApp
      entityName="Availability"
      formBase="User_availability"
      searchFilters={searchFilters}
      limit={limit}
      modifyFormDefinition={modifyFormDefinition}
      backendUrl={backendUrl}
      businessUnit={businessUnit}
      appContext={appContext}
      reportIds={reportIds}
    />
  )
}

UserAvailability.propTypes = {
  allowCreate: PropTypes.bool,
  reportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  intl: PropTypes.object.isRequired,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContextPropType.propTypes.isRequired
}

export default UserAvailability
