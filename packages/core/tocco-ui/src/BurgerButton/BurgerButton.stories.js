import BurgerButton from './'

export default {
  title: 'Tocco-UI/Burger Button',
  component: BurgerButton,
  argTypes: {
    isOpen: {type: 'boolean', defaultValue: false},
    intl: {
      table: {
        disable: true
      }
    }
  }
}

export const Basic = args => (
  <div style={{backgroundColor: '#B22A31', height: '24px', width: '24px', padding: '5px'}}>
    <BurgerButton {...args} />
  </div>
)
