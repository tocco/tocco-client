import PropTypes from 'prop-types'
import {Route, Routes} from 'react-router-dom'

import DocsView from '../../DocsView'
import DocumentView from '../../DocumentView'

const RoutesContent = ({navigationStrategy, handleSearchChange, emitAction, openFileDialog, searchMode, docsKey}) => (
  <Routes>
    <Route exact path="doc/:key/detail" element={<DocumentView navigationStrategy={navigationStrategy} />} />
    <Route
      exact
      path=":model/:key/list"
      element={
        <DocsView
          key={docsKey}
          navigationStrategy={navigationStrategy}
          onSearchChange={handleSearchChange}
          emitAction={emitAction}
          openFileDialog={openFileDialog}
          searchMode={searchMode}
        />
      }
    />
    <Route
      exact
      path="/"
      element={
        <DocsView
          key={docsKey}
          navigationStrategy={navigationStrategy}
          onSearchChange={handleSearchChange}
          emitAction={emitAction}
          openFileDialog={openFileDialog}
          searchMode={searchMode}
        />
      }
    />
  </Routes>
)

RoutesContent.propTypes = {
  params: PropTypes.object,
  emitAction: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  openFileDialog: PropTypes.func.isRequired,
  searchMode: PropTypes.bool.isRequired,
  navigationStrategy: PropTypes.object,
  docsKey: PropTypes.string
}

export default RoutesContent
