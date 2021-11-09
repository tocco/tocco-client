import React, {lazy, Suspense} from 'react'

const DatePickerComponent = lazy(() => import(/* webpackChunkName: "vendor-date-picker" */ './DatePicker'))

const renderLoader = () => <React.Fragment/>

const LazyDatePicker = props => (
  <Suspense fallback={renderLoader()}>
    <DatePickerComponent {...props}/>
  </Suspense>
)

export default LazyDatePicker
