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
        <Icon icon="cog" style={{color: '#4bcc2d', fontSize: '16px'}}/>
        <Icon icon="cog" style={{color: '#CCCC00', fontSize: '20px'}}/>
        <Icon icon="cog" style={{fontSize: '3rem'}}/>
        <Icon icon="cog" style={{color: 'blue', fontSize: '50px'}}/>
        <Icon icon="tocco" style={{color: '#C01E30', fontSize: '80px'}}/>
        <Icon icon="office" style={{color: 'orange', fontSize: '20px'}}/>
      </div>
    )
  )
  .add(
    'Icons',
    () => <IconsShowcase/>
  )
