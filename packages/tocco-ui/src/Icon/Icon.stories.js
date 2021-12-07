import React from 'react'

import {Icon} from './Icon'
import IconsShowcase from './IconShowcase'

export default {
  title: 'Tocco-UI/Icon',
  component: Icon
}

export const Basic = () => (
  <div>
    <Icon icon="cog" style={{color: '#4bcc2d', fontSize: '16px'}} />
    <Icon icon="cog" style={{color: '#CCCC00', fontSize: '20px'}} />
    <Icon icon="cog" style={{fontSize: '3rem'}} />
    <Icon icon="cog" style={{color: 'blue', fontSize: '50px'}} />
    <Icon icon="tocco" style={{color: '#C01E30', fontSize: '80px'}} />
    <Icon icon="office" style={{color: 'orange', fontSize: '20px'}} />
  </div>
)

export const Showcase = () => <IconsShowcase />
