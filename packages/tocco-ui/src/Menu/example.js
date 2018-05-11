/* eslint no-console: 0 */
import React from 'react'

import Button from '../Button'
import ButtonLink from '../ButtonLink'
import Icon from '../Icon'

import Item from './Item'
import ItemAccordion from './ItemAccordion'
import ItemFlyout from './ItemFlyout'
import MenuBar from './MenuBar'
import MenuButton from './MenuButton'
import MenuStack from './MenuStack'

// real-import:import {Item, ItemAccordion, ItemFlyout, MenuBar, MenuButton, MenuStack} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <h3>Menu Items Flat</h3>
      <MenuStack look="flat">
        <Item><Button label="<Button>"/></Item>
        <Item><Button ink="primary" label="<Button primary>"/></Item>
        <Item><ButtonLink label="<ButtonLink>"/></Item>
        <Item><ButtonLink ink="primary" label="<ButtonLink primary>"/></Item>
      </MenuStack>

      <h3>Menu Items Raised</h3>
      <MenuStack look="raised">
        <Item><Button label="<Button raised>"/></Item>
        <Item><Button ink="primary" label="<Button raised primary>"/></Item>
        <Item><ButtonLink label="<ButtonLink raised>"/></Item>
        <Item><ButtonLink ink="primary" label="<ButtonLink raised primary>"/></Item>
      </MenuStack>

      <h3>Menu Items Miscellaneous</h3>
      <MenuStack look="flat">
        <Item><span>span</span></Item>
        <Item><em>em</em></Item>
        <hr/>
        <Item><strong>strong</strong></Item>
        <Item><Icon icon="fa-check-square-o"/></Item>
      </MenuStack>

      <h3>Menu Bar Flat</h3>
      <MenuBar>
        <Item><Button label="<Button>"/></Item>
        <Item><Button ink="primary" label="<Button primary>"/></Item>
        <hr/>
        <Item><ButtonLink label="<ButtonLink>"/></Item>
        <Item><ButtonLink ink="primary" label="<ButtonLink primary>"/></Item>
      </MenuBar>

      <h3>Menu Button Raised</h3>
      <MenuButton look="raised">
        <Item><Button label="<Button>"/></Item>
        <Item><Button ink="primary" label="<Button primary>"/></Item>
        <hr/>
        <Item><ButtonLink label="<ButtonLink>"/></Item>
        <Item><ButtonLink ink="primary" label="<ButtonLink primary>"/></Item>
      </MenuButton>

      <h3>Menu Stack</h3>
      <MenuStack>
        <Item><Button label="A"/></Item>
        <Item>
          <Button label="B"/>
          <MenuStack>
            <Item>
              <Button label="B-1"/>
              <MenuStack>
                <Item><Button label="B-1-a"/></Item>
                <Item><Button label="B-1-b"/></Item>
              </MenuStack>
            </Item>
            <Item><Button label="B-2"/></Item>
          </MenuStack>
        </Item>
        <Item><Button label="C"/></Item>
      </MenuStack>

      <h3>Accordion Menu</h3>
      <MenuStack>
        <ItemAccordion isOpen={true} label="Toggle Menu">
          <MenuStack>
            <Item><Button label="A"/></Item>
            <Item><Button label="B"/></Item>
            <ItemAccordion isOpen={false} label="Toggle C">
              <MenuStack>
                <Item><Button label="C-1"/></Item>
                <Item><Button label="C-2"/></Item>
              </MenuStack>
            </ItemAccordion>
            <Item><Button label="E"/></Item>
          </MenuStack>
        </ItemAccordion>
      </MenuStack>

      <h3>Flyout Menu</h3>
      <MenuStack>
        <ItemFlyout isOpen={true} label="Toggle Menu">
          <MenuStack>
            <Item><Button label="A"/></Item>
            <ItemFlyout isOpen={false} label="Toggle Menu B">
              <MenuStack>
                <Item><Button label="B-1"/></Item>
                <Item><Button label="B-2"/></Item>
                <Item><Button label="B-2"/></Item>
              </MenuStack>
            </ItemFlyout>
            <ItemFlyout isOpen={true} label="Toggle Menu C">
              <MenuStack>
                <Item><Button label="C-1"/></Item>
                <Item><Button label="C-2"/></Item>
              </MenuStack>
            </ItemFlyout>
            <Item><Button label="E"/></Item>
          </MenuStack>
        </ItemFlyout>
      </MenuStack>

      <h3>Menu Bar Flyout</h3>
      <MenuButton look="raised">
        <Item><Button label="Single Action"/></Item>
        <ItemFlyout isOpen={false} label="Toggle action set 1">
          <MenuStack>
            <Item><Button label="Action 1-1"/></Item>
            <Item><Button label="Action 1-2"/></Item>
            <Item><Button label="Action 1-3"/></Item>
          </MenuStack>
        </ItemFlyout>
        <ItemFlyout isOpen={true} label="Toggle action set 2">
          <MenuStack>
            <Item><Button label="Action 2-1"/></Item>
            <Item><Button label="Action 2-2"/></Item>
          </MenuStack>
        </ItemFlyout>
      </MenuButton>

      {/* end example */}
    </div>
  )
}
