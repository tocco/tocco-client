import React from 'react'
import {Redirect} from 'react-router-dom'

import devCon from './devcon'
import log from './log'
import dbRefactoring from './dbrefactoring'

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
    }
  ]
}]

export default createRoutes
