import React from 'react'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className="container" style={{margin: '10px', marginBottom: '0px'}}>
    {children}
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
