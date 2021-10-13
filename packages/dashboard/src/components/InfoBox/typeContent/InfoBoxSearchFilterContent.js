import React from 'react'
import PropTypes from 'prop-types'
import EntityListApp from 'tocco-entity-list/src/main'

const InfoBoxSearchFilterContent = ({id, content}) => {
  const {searchfilter, entityName, scope, limit} = content
  return <div>
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
  </div>
}

InfoBoxSearchFilterContent.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
}

export default InfoBoxSearchFilterContent
