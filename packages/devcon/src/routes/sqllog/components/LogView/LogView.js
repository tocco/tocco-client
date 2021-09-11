import React from 'react'
import {Typography} from 'tocco-ui'

import LogForm from '../LogForm'
import LogTable from '../LogTable'

const LogView = () => (
  <>
    <Typography.H1>SQL Log</Typography.H1>
    <LogForm/>
    <LogTable/>
  </>
)

export default LogView
