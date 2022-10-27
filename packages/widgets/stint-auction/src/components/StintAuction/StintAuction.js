import PropTypes from 'prop-types'
import EntityBrowserApp from 'tocco-entity-browser/src/main'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/main'
import {appContext as appContextPropType} from 'tocco-util'

import {modifyFormDefinition} from './formModifier'

const StintAuction = props => {
  const {searchFilters, searchFormType, limit, backendUrl, businessUnit, appContext, reportIds} = props

  return (
    <EntityBrowserApp
      entityName="Event"
      formBase="Stint_auction"
      searchFilters={searchFilters}
      limit={limit}
      modifyFormDefinition={formDefinition => modifyFormDefinition(formDefinition, appContext)}
      backendUrl={backendUrl}
      businessUnit={businessUnit}
      appContext={appContext}
      searchFormType={searchFormType}
      reportIds={reportIds}
    />
  )
}

StintAuction.propTypes = {
  searchFormType: searchFormTypePropTypes,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContextPropType.propTypes.isRequired,
  reportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  intl: PropTypes.object.isRequired
}

export default StintAuction
