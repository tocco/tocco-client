import React from 'react'

import BurgerButton from './'

export default {
  title: 'Tocco-UI/Burger Button',
  component: BurgerButton,
  argTypes: {
    isOpen: {
      type: 'boolean'
    }
  }
}

export const Basic = args => <BurgerButton
  size="20"
  color="black"
  {...args}
/>
