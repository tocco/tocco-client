import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'

import {StyledInfoBoxContentWrapper} from './StyledComponents'

const InfoBoxSearchFilterContent = ({id, content}) => {
  const {searchfilter, entityName, scope, limit} = content
  return <StyledInfoBoxContentWrapper>
    <EntityListApp
      id={id}
      limit={limit}
      entityName={entityName}
      formName={entityName}
      searchFilters={[searchfilter]}
      scope={scope}
      showActions={false}
      searchFormType="simple"
      searchFormPosition="top"
      selectionStyle="none"
      sortable
      disableSelectionController
    />
  </StyledInfoBoxContentWrapper>
}

InfoBoxSearchFilterContent.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
}

export default InfoBoxSearchFilterContent
