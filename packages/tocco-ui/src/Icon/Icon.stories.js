import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'

import {Icon} from './Icon'
import IconsShowcase from './IconShowcase'

storiesOf('Tocco-UI | Icon', module)
  .addDecorator(withKnobs)
  .add(
    'Icon Examples',
    () => (
      <div>
        <Icon icon="lemon" style={{color: '#CCCC00', fontSize: '50px'}}/>
        <Icon icon="balance-scale-left" style={{fontSize: '5rem'}}/>
        <Icon icon="microsoft" style={{color: 'blue', fontSize: '50px'}}/>
        <Icon icon="tocco" style={{color: '#C01E30', fontSize: '80px'}}/>
      </div>
    )
  )
  .add(
    'Icons',
    () => <IconsShowcase/>
  )
