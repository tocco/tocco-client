/* eslint-disable no-alert */
import React from 'react'

import Preview from './'
// real-import:import {Preview} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Preview
        alt="orange jellyfish floating in the deep blue sea"
        srcUrl="https://picsum.photos/500/500?image=1069"
        thumbnailUrl="https://picsum.photos/150/150?image=1069"
        maxDimensionY="130px"
        maxDimensionX="120px"
      />
      <Preview
        alt="hundreds of juicy strawberries tempting to degustate"
        caption="hundred juicy strawberries"
        downloadOnClick={true}
        fileName="strawberries.jpg"
        srcUrl="https://picsum.photos/500/500?image=1080"
        thumbnailUrl="https://picsum.photos/100/100?image=1080"
      />
      <Preview
        alt="image listen on click event"
        caption="image listen on click event"
        onClick={(srcUrl, thumbnailUrl) => alert(srcUrl + '\n' + thumbnailUrl)}
        srcUrl="https://picsum.photos/500/500?image=1054"
        thumbnailUrl="https://picsum.photos/300/150?image=1054"
      />
      <Preview
        alt="test"
        caption="Test.pdf"
        srcUrl="https://someurl.ch/test.pdf"
      />
      {/* end example */}
    </div>
  )
}
