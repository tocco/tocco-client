import React, {useState, useRef, useEffect} from 'react'
import {Button} from 'tocco-ui'

import {AdminSearchGrid, SearchFiterBox, SearchFormBox} from './StyedComponents'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import SearchFilterList from '../SearchFilterList'

const AdminSearchForm = () => {
  const wrapperEl = useRef(null)
  const [searchFilterExpanded, setSearchFilterExpanded] = useState(false)
  const [searchFilterHasScroll, setSearchFilterHasScroll] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setSearchFilterHasScroll(wrapperEl.current.scrollHeight > wrapperEl.current.clientHeight)
    })
  })

  return <AdminSearchGrid searchFilterExpanded={searchFilterExpanded}>
    <SearchFiterBox ref={wrapperEl}>
      <SearchFilterList/>
      {(searchFilterHasScroll || searchFilterExpanded)
      && <Button
        style={{position: 'sticky', left: 'calc(50% - 12px)'}}
        icon={searchFilterExpanded ? 'arrow-up' : 'arrow-down'}
        onClick={() => setSearchFilterExpanded(!searchFilterExpanded)}
      />}
    </SearchFiterBox>
    <SearchFormBox>
      <BasicSearchFormContainer disableSimpleSearch={true}/>
    </SearchFormBox>
  </AdminSearchGrid>
}

export default AdminSearchForm
