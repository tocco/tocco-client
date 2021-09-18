import React from 'react'
import {Redirect} from 'react-router-dom'

import devCon from './devcon'
import log from './log'
import modelValidation from './modelvalidation'
import dbRefactoring from './dbrefactoring'
import sqlLog from './sqllog'

export const createRoutes = (store, input) => [{
  path: '/',
  render: devCon(store, input),
  routes: [
    {
      path: '/',
      exact: true,
      render: () => <Redirect to={{pathname: '/log'}}/>
    },
    {
      path: '/log',
      exact: true,
      render: log(store, input)
    },
    {
      path: '/dbrefactoring',
      exact: true,
      render: dbRefactoring(store, input)
    },
    {
      path: '/modelvalidation',
      exact: true,
      render: modelValidation(store, input)
    },
    {
      path: '/sqllog',
      exact: true,
      render: sqlLog(store, input)
    }
  ]
}]

export default createRoutes
