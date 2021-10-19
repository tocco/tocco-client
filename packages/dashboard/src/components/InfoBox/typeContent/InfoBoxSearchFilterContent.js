import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'

import {StyledInfoBoxContentWrapper} from './StyledComponents'

const InfoBoxSearchFilterContent = ({id, content, navigationStrategy}) => {
  const {searchfilter, entityName, scope, limit} = content

  const handleRowClick = ({id}) => {
    navigationStrategy.openDetail(entityName, id)
  }

  return <StyledInfoBoxContentWrapper>
    <EntityListApp
      id={id}
      limit={limit}
      entityName={entityName}
      formName={entityName}
      searchFilters={[searchfilter]}
      scope={scope}
      showActions={false}
      onRowClick={handleRowClick}
      searchFormType="simple"
      searchFormPosition="top"
      selectionStyle="none"
      sortable
      disableSelectionController
      navigationStrategy={navigationStrategy}
    />
  </StyledInfoBoxContentWrapper>
}

InfoBoxSearchFilterContent.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  navigationStrategy: PropTypes.object
}

export default InfoBoxSearchFilterContent
