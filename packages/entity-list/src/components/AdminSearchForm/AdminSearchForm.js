import React from 'react'
import {Panel, Typography} from 'tocco-ui'

import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'

const AdminSearchForm = () => {
  return <div>
    <Panel.Wrapper isToggleable={false} isFramed={false}><Panel.Body>
      <div style={{padding: '10px'}}>
        <Typography.Span>Search Filters coming soon...</Typography.Span>
      </div>
    </Panel.Body></Panel.Wrapper>
    <br/>
    <Panel.Wrapper isToggleable={false} isFramed={false}><Panel.Body>
      <div style={{padding: '4px'}}>
        <BasicSearchFormContainer disableSimpleSearch={true}/>
      </div>
    </Panel.Body></Panel.Wrapper>
  </div>
}

export default AdminSearchForm
