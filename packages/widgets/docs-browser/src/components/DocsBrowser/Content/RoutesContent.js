import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'

import DocsView from '../../DocsView'
import DocumentView from '../../DocumentView'

const RoutesContent = ({navigationStrategy, handleSearchChange, emitAction, openFileDialog, searchMode, docsKey}) => (
  <Switch>
    <Route
      exact
      path={'/docs/doc/:key/detail'}
      render={() => <DocumentView navigationStrategy={navigationStrategy} />}
    />
    <Route
      exact
      path={['/docs/:model/:key/list', '/docs']}
      render={() => (
        <DocsView
          key={docsKey}
          navigationStrategy={navigationStrategy}
          onSearchChange={handleSearchChange}
          emitAction={emitAction}
          openFileDialog={openFileDialog}
          searchMode={searchMode}
        />
      )}
    />
  </Switch>
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
