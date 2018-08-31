import React from 'react'

import Item from './Item'
import ItemAccordion from './ItemAccordion'
import ItemFlyout from './ItemFlyout'
import MenuBar from './MenuBar'
import MenuButton from './MenuButton'
import MenuButtonGroup from './MenuButtonGroup'
import MenuStack from './MenuStack'

/**
 * Use <Menu.*> to structure <Button> and <ButtonLink> hierarchically as a menu.
 * <Menu> is an unstyled base class and would normally not be used directly.
 */
class Menu extends React.Component {
  static Item = Item
  static ItemAccordion = ItemAccordion
  static ItemFlyout = ItemFlyout
  static Bar = MenuBar
  static Button = MenuButton
  static ButtonGroup = MenuButtonGroup
  static Stack = MenuStack

  render() {
    return <React.Fragment />
  }
}

export default Menu
