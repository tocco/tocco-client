import React, {lazy, Suspense} from 'react'

const IconComponent = lazy(() => import('./Icon'))

const renderLoader = () => <p>..</p>

export default props => (
  <Suspense fallback={renderLoader()}>
    <IconComponent {...props}/>
  </Suspense>
)
