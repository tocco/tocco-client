import React, {lazy, Suspense} from 'react'
const ResourceSchedulerComponent = lazy(() => import('./ResourceScheduler'))

const renderLoader = () => <React.Fragment/>

export default props => (
  <Suspense fallback={renderLoader()}>
    <ResourceSchedulerComponent {...props}/>
  </Suspense>
)
