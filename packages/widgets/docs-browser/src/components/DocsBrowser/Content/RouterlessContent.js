import PropTypes from 'prop-types'

import DocsView from '../../DocsView'
import DocumentView from '../../DocumentView'

const RouterlessContent = ({
  params,
  navigationStrategy,
  handleSearchChange,
  emitAction,
  openFileDialog,
  searchMode,
  docsKey
}) => {
  const {model, view} = params

  if (model === 'doc' && view === 'detail') {
    return <DocumentView navigationStrategy={navigationStrategy} />
  }

  return (
    <DocsView
      key={docsKey}
      navigationStrategy={navigationStrategy}
      onSearchChange={handleSearchChange}
      emitAction={emitAction}
      openFileDialog={openFileDialog}
      searchMode={searchMode}
    />
  )
}

RouterlessContent.propTypes = {
  params: PropTypes.object,
  emitAction: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  openFileDialog: PropTypes.func.isRequired,
  searchMode: PropTypes.bool.isRequired,
  navigationStrategy: PropTypes.object,
  docsKey: PropTypes.string
}

export default RouterlessContent
