import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {Button, LoadMask, Select, StatedValue} from 'tocco-ui'

import {StyledStickyButton} from './StyledComponents'

const Selection = ({intl, loadReports, openReportAction, reports, selectedReport, setSelectedReport}) => {
  const msg = id => intl.formatMessage({id})

  useEffect(() => {
    loadReports()
  }, [loadReports])

  return (
    <LoadMask required={[reports]}>
      <StatedValue>
        <Select isMulti={false} value={selectedReport} options={reports} onChange={setSelectedReport} />
      </StatedValue>
      <StyledStickyButton>
        <Button
          look="raised"
          ink="primary"
          onClick={() => openReportAction(selectedReport.key)}
          label={msg('client.entity-report.next')}
          disabled={selectedReport == null}
        />
      </StyledStickyButton>
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
