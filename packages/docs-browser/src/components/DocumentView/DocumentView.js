import React, {Suspense} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'

import Action from '../Action/'
import {StyledDocumentViewWrapper} from './StyledComponents'

const LazyDetailApp = React.lazy(() => import('./LazyDetailApp'))

const DocumentView = ({match, history, breadcrumbs, formName, navigationStrategy, locale, emitAction}) => {
  const handleEntityDeleted = () => {
    const lastList = breadcrumbs.slice().reverse()
      .find(breadcrumb => breadcrumb.type === 'list')
    const lastListUrl = `/docs/${lastList.path}`
    history.push(lastListUrl)
  }

  return (
    <StyledDocumentViewWrapper>
      <Suspense fallback={<LoadMask/>}>
        <LazyDetailApp
          entityName="Resource"
          entityId={match.params.key}
          formName={formName || 'DmsResource'}
          mode="update"
          actionAppComponent={Action}
          navigationStrategy={navigationStrategy}
          emitAction={emitAction}
          onEntityDeleted={handleEntityDeleted}
          locale={locale}
        />
      </Suspense>
    </StyledDocumentViewWrapper>
  )
}

DocumentView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  formName: PropTypes.string,
  navigationStrategy: PropTypes.object,
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired
}

export default DocumentView
