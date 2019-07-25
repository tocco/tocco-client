import React from 'react'
import {Typography} from 'tocco-ui'

import {StyledLink} from '../../../../components/StyledLink'

const EntitiesOverview = props => {
  return (
    <div>
      <Typography.H2>Entities Overview</Typography.H2>
      <Typography.Span>List of all available Entities</Typography.Span>
      <ul>
        <li><StyledLink to="/e/User">User</StyledLink></li>
        <li><StyledLink to="/e/Address">Address</StyledLink></li>
      </ul>
    </div>
  )
}

EntitiesOverview.propTypes = {
}

export default EntitiesOverview
