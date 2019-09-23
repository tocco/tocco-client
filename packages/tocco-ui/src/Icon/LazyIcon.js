import React, {lazy, Suspense} from 'react'

const IconComponent = lazy(() => import(/* webpackChunkName: "icons" */ './Icon'))

const renderLoader = () => <React.Fragment/>

const LazyIcon = props => (
  <Suspense fallback={renderLoader()}>
    <IconComponent {...props}/>
  </Suspense>
)

export default LazyIcon
