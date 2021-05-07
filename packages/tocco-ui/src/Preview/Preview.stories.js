import React from 'react'

import Preview from './'

export default {
  title: 'Tocco-UI/Preview',
  component: Preview,
  argTypes: {
    alt: {type: 'string', defaultValues: 'Alt'},
    caption: {type: 'string', defaultValue: 'Caption'},
    downloadOnClick: {type: 'boolean'},
    fileName: {type: 'string', defaultValue: 'car_nature.jpg'},
    srcUrl: {type: 'string', defaultValue: 'https://picsum.photos/1000/1000?image=1070'},
    thumbnailUrl: {type: 'string', defaultValue: 'https://picsum.photos/1000/1000?image=1070'},
    maxDimensionY: {type: 'string', defaultValue: '430px'},
    maxDimensionX: {type: 'string', defaultValue: '420px'}
  }
}

export const Basic = args => <Preview {...args}/>
