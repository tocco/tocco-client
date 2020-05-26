import React from 'react'
import {storiesOf} from '@storybook/react'
import {text, withKnobs} from '@storybook/addon-knobs'

import QRCode from './'

storiesOf('Tocco-UI | QRCode', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => {
      return <QRCode
        value={text('Value', 'Storybook')}
      />
    }
  )
