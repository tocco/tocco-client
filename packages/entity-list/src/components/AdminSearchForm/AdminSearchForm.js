import React from 'react'
import ReactDOM from 'react-dom'
import {Icon} from 'tocco-ui'
import Split from 'react-split'

import {AdminSearchGrid, Box, StyledGutter} from './StyedComponents'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import SearchFilterList from '../SearchFilterList'

const getGutter = () => {
  const gutterEl = document.createElement('div')
  gutterEl.style.cssText = 'padding-bottom:.5rem;background:#ffffff;'
  ReactDOM.render(<StyledGutter>
    <Icon icon="horizontal-rule"/>
  </StyledGutter>, gutterEl)
  return gutterEl
}

const AdminSearchForm = () => {
  return <AdminSearchGrid>
    <Split
      direction="vertical"
      sizes={[25, 73]}
      minSize={[27, 100]}
      gutterSize={15}
      gutter={getGutter}
    >
      <Box>
        <SearchFilterList/>
      </Box>
      <Box>
        <BasicSearchFormContainer disableSimpleSearch={true}/>
      </Box>
    </Split>
  </AdminSearchGrid>
}

export default AdminSearchForm
