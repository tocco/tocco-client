import React from 'react'
import PropTypes from 'prop-types'
import {EditableValue, Button} from 'tocco-ui'

const SqlDialog = ({sql, setSql, executeSql, close}) => {
  const handleExecute = () => {
    executeSql(close)
  }

  return (
    <div>
      <EditableValue type="text" value={sql} events={{onChange: setSql}}/>
      <Button look="raised" onClick={handleExecute} label="Run Statements"/>
    </div>
  )
}

SqlDialog.propTypes = {
  sql: PropTypes.string,
  setSql: PropTypes.func.isRequired,
  executeSql: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

export default SqlDialog
