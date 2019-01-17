import React from 'react'
import {storiesOf} from '@storybook/react'
import {select, text, withKnobs} from '@storybook/addon-knobs'

import IconTocco from './'
import {stylingPosition} from '../utilStyles'
import excludeIntlInfo from '../util/excludeIntlInfo'

storiesOf('Tocco Specific', module)
  .addDecorator(withKnobs)
  .add(
    'IconTocco',
    () => <IconTocco size={text('size', '40px')} position={select('position', stylingPosition)}/>, excludeIntlInfo()
  )
