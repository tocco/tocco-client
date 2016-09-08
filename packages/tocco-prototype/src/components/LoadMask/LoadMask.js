import React from 'react'

const LoadMask = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    opacity: 0.5
  }}/>
)

export default LoadMask
