import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {form} from 'tocco-app-extensions'
import EntityBrowserApp from 'tocco-entity-browser/src/main'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/main'
import {LoadMask} from 'tocco-ui'
import {appContext as appContextPropType} from 'tocco-util'

const ReservationLecturerBookingView = ({
  loadReports,
  reports,
  searchFormType,
  reportIds,
  searchFilters,
  limit,
  intl,
  backendUrl,
  businessUnit,
  appContext
}) => {
  useEffect(() => {
    loadReports(reportIds)
  }, [loadReports, reportIds])

  const modifyFormDefinition = formDefinition => {
    if (reports.length > 0) {
      formDefinition = form.addReports(formDefinition, reports, intl)
    }

    return formDefinition
  }

  return (
    <LoadMask required={[reports]}>
      <EntityBrowserApp
        entityName="Reservation_lecturer_booking"
        formBase="ReservationLecturerBookingView"
        disableDetailView={true}
        searchFormType={searchFormType}
        searchFilters={searchFilters}
        limit={limit}
        modifyFormDefinition={modifyFormDefinition}
        backendUrl={backendUrl}
        businessUnit={businessUnit}
        appContext={appContext}
      />
    </LoadMask>
  )
}

ReservationLecturerBookingView.propTypes = {
  loadReports: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(PropTypes.object),
  searchFormType: searchFormTypePropTypes,
  reportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  intl: PropTypes.object.isRequired,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContextPropType.propTypes.isRequired
}

export default ReservationLecturerBookingView
