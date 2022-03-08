import PropTypes from 'prop-types'
import React, {Suspense} from 'react'
import {LoadMask} from 'tocco-ui'

import Action from '../Action/'
import {StyledDocumentViewWrapper} from './StyledComponents'

const LazyDetailApp = React.lazy(() => import('./LazyDetailApp'))

const DocumentView = ({breadcrumbs, formName, navigationStrategy, locale, emitAction, navigate, params}) => {
  const handleEntityDeleted = () => {
    const lastList = breadcrumbs
      .slice()
      .reverse()
      .find(breadcrumb => breadcrumb.type === 'list')
    const lastListUrl = `/docs/${lastList.path}`
    navigate(lastListUrl)
  }

  return (
    <StyledDocumentViewWrapper>
      <Suspense fallback={<LoadMask />}>
        <LazyDetailApp
          entityName="Resource"
          entityId={params.key}
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
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  formName: PropTypes.string,
  navigationStrategy: PropTypes.object,
  locale: PropTypes.string,
  emitAction: PropTypes.func.isRequired,
  navigate: PropTypes.func,
  params: PropTypes.object
}

export default DocumentView
