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

export const Basic = args => <BurgerButton {...args} />
