import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, text} from '@storybook/addon-knobs'

import Preview from './'

storiesOf('Tocco-UI | Preview', module)
  .addDecorator(withKnobs)
  .add(
    'Preview',
    () => <Preview
      alt={text('Alt', 'classic car parked in nature')}
      caption={text('Caption', 'classic nature car')}
      downloadOnClick={boolean('Download on click', true)}
      fileName={text('Filename', 'car_nature.jpg')}
      srcUrl={text('Source URL', 'https://picsum.photos/1000/1000?image=1070')}
      thumbnailUrl={text('Thumbnail URL', 'https://picsum.photos/1000/1000?image=1070')}
      maxDimensionY={text('MaxDimensionY', '430px')}
      maxDimensionX={text('MaxDimensionX', '420px')}
    />
  )
