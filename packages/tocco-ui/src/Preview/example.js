import React from 'react'
import Preview from './'
// real-import:import {Preview} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Preview
        srcLink="https://unsplash.it/200/300"
        thumbnailLink="https://unsplash.it/200"
        caption="A random image"
        alt="Alternative text"
        downloadOnClick
      />
      <Preview
        srcLink="https://unsplash.it/200/300"
        thumbnailLink="https://unsplash.it/200"
        onClick={(srcLink, thumbnailLink) => alert(srcLink + '\n' + thumbnailLink)}
      />
      {/* end example */}
    </div>
  )
}
