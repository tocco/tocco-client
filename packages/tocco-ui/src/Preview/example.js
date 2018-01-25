/* eslint-disable no-alert */
import React from 'react'
import Preview from './'
// real-import:import {Preview} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Preview
        srcUrl="https://unsplash.it/150"
        thumbnailUrl="https://unsplash.it/150"
        caption="A random image"
        alt="Alternative text"
        downloadOnClick
      />
      <Preview
        srcUrl="https://unsplash.it/150"
        thumbnailUrl="https://unsplash.it/150"
        onClick={(srcUrl, thumbnailUrl) => alert(srcUrl + '\n' + thumbnailUrl)}
      />
      <Preview
        srcUrl="https://someurl.ch/test.pdf"
        caption="Test.pdf"
      />
      {/* end example */}
    </div>
  )
}
