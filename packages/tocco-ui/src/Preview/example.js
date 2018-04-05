/* eslint-disable no-alert */
import React from 'react'
import Preview from './'
// real-import:import {Preview} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Preview
        alt="Alternative text"
        srcUrl="https://picsum.photos/500/500?image=1069"
        thumbnailUrl="https://picsum.photos/150/150?image=1069"
      />
      <Preview
        alt="Alternative text"
        caption="Linked image with a hundreds of strawberries."
        downloadOnClick={true}
        srcUrl="https://picsum.photos/500/500?image=1080"
        thumbnailUrl="https://picsum.photos/100/100?image=1080"
      />
      <Preview
        caption="image listen on click event"
        onClick={(srcUrl, thumbnailUrl) => alert(srcUrl + '\n' + thumbnailUrl)}
        srcUrl="https://picsum.photos/500/500?image=1054"
        thumbnailUrl="https://picsum.photos/300/150?image=1054"
      />
      <Preview
        caption="Test.pdf"
        srcUrl="https://someurl.ch/test.pdf"
      />
      {/* end example */}
    </div>
  )
}
