import React from 'react'
import PropTypes from 'prop-types'
import {EditableValue, Button} from 'tocco-ui'

const ChangelogDialog = ({changelog, setChangelog, executeChangelog, close}) => {
  const handleExecute = () => {
    if (executeChangelog) {
      executeChangelog(close)
    }
  }

  return (
    <div>
      <EditableValue type="text" value={changelog} events={{onChange: setChangelog}} readOnly={!executeChangelog}/>
      {executeChangelog && <Button look="raised" onClick={handleExecute} label="Execute Changelog"/>}
    </div>
  )
}

ChangelogDialog.propTypes = {
  changelog: PropTypes.string,
  setChangelog: PropTypes.func,
  executeChangelog: PropTypes.func,
  close: PropTypes.func.isRequired
}

export default ChangelogDialog
