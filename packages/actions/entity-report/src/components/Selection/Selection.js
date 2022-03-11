import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {Button, LoadMask, Select} from 'tocco-ui'

const Selection = ({intl, loadReports, openReportAction, reports, selectedReport, setSelectedReport}) => {
  const msg = id => intl.formatMessage({id})

  useEffect(() => {
    loadReports()
  }, [loadReports])

  return (
    <LoadMask required={[reports]}>
      <Select isMulti={false} value={selectedReport} options={reports} onChange={setSelectedReport} />
      <Button
        look="raised"
        ink="primary"
        onClick={() => openReportAction(selectedReport.key)}
        label={msg('client.entity-report.next')}
        disabled={selectedReport == null}
      />
    </LoadMask>
  )
}

Selection.propTypes = {
  intl: PropTypes.object.isRequired,
  loadReports: PropTypes.func.isRequired,
  openReportAction: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      display: PropTypes.string
    })
  ),
  selectedReport: PropTypes.shape({
    key: PropTypes.string,
    display: PropTypes.string
  }),
  setSelectedReport: PropTypes.func.isRequired
}

export default Selection
