import React, {lazy, Suspense} from 'react'

const IconComponent = lazy(() => import('./LoadingSpinner'))

const renderLoader = () => <React.Fragment/>

export default props => (
  <Suspense fallback={renderLoader()}>
    <IconComponent {...props}/>
  </Suspense>
)
