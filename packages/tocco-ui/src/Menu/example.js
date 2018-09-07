/* eslint no-console: 0 */
import React from 'react'

import Button from '../Button'
import ButtonLink from '../ButtonLink'
import Icon from '../Icon'
import {MenuStack, MenuItem, MenuButton, MenuBar, MenuButtonGroup, MenuItemAccordion, MenuItemFlyout} from './'
// eslint-disable-next-line max-len
// real-import:import {MenuStack, MenuItem, MenuButton, MenuBar, MenuButtonGroup, MenuItemAccordion, MenuItemFlyout} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <h3>Menu Items Flat</h3>
      <MenuStack look="flat">
        <MenuItem><Button label="<Button>"/></MenuItem>
        <MenuItem><Button ink="primary" label="<Button primary>"/></MenuItem>
        <MenuItem><ButtonLink href="#Menu" label="<ButtonLink>"/></MenuItem>
        <MenuItem><ButtonLink href="#Menu" ink="primary" label="<ButtonLink primary>"/></MenuItem>
      </MenuStack>

      <h3>Menu Items Raised</h3>
      <MenuStack look="raised">
        <MenuItem><Button label="<Button raised>"/></MenuItem>
        <MenuItem><Button ink="primary" label="<Button raised primary>"/></MenuItem>
        <MenuItem><ButtonLink href="#Menu" label="<ButtonLink raised>"/></MenuItem>
        <MenuItem><ButtonLink href="#Menu" ink="primary" label="<ButtonLink raised primary>"/></MenuItem>
      </MenuStack>

      <h3>Menu Items Miscellaneous</h3>
      <MenuStack look="flat">
        <MenuItem><span>span</span></MenuItem>
        <MenuItem><em>em</em></MenuItem>
        <hr/>
        <MenuItem><strong>strong</strong></MenuItem>
        <MenuItem><Icon icon="fa-check-square-o"/></MenuItem>
      </MenuStack>

      <h3>Menu Bar Flat</h3>
      <MenuBar>
        <MenuItem><Button label="<Button>"/></MenuItem>
        <MenuItem><Button ink="primary" label="<Button primary>"/></MenuItem>
        <hr/>
        <MenuItem><ButtonLink href="#Menu" label="<ButtonLink>"/></MenuItem>
        <MenuItem><ButtonLink href="#Menu" ink="primary" label="<ButtonLink primary>"/></MenuItem>
      </MenuBar>

      <h3>Menu Button Raised</h3>
      <MenuButton look="raised">
        <MenuItem><Button label="<Button>"/></MenuItem>
        <MenuItem><Button ink="primary" label="<Button primary>"/></MenuItem>
        <hr/>
        <MenuItem><ButtonLink href="#Menu" label="<ButtonLink>"/></MenuItem>
        <MenuItem><ButtonLink href="#Menu" ink="primary" label="<ButtonLink primary>"/></MenuItem>
      </MenuButton>

      <h3>Menu Stack</h3>
      <MenuStack>
        <MenuItem><Button label="A"/></MenuItem>
        <MenuItem>
          <Button label="B"/>
          <MenuStack>
            <MenuItem isOpen={false}>
              <Button label="B-1"/>
              <MenuStack>
                <MenuItem><Button label="B-1-a"/></MenuItem>
                <MenuItem><Button label="B-1-b"/></MenuItem>
              </MenuStack>
            </MenuItem>
            <MenuItem><Button label="B-2"/></MenuItem>
          </MenuStack>
        </MenuItem>
        <MenuItem><Button label="C"/></MenuItem>
      </MenuStack>

      <h3>Accordion Menu</h3>
      <MenuStack>
        <MenuItemAccordion label="Toggle Menu">
          <MenuStack>
            <MenuItem><Button label="A"/></MenuItem>
            <MenuItem><Button label="B"/></MenuItem>
            <MenuItemAccordion isOpen={false} label="Toggle C">
              <MenuStack>
                <MenuItem><Button label="C-1"/></MenuItem>
                <MenuItem><Button label="C-2"/></MenuItem>
              </MenuStack>
            </MenuItemAccordion>
            <MenuItem><Button label="E"/></MenuItem>
          </MenuStack>
        </MenuItemAccordion>
      </MenuStack>

      <h3>Flyout Menu</h3>
      <MenuStack>
        <MenuItemFlyout isOpen={true} label="Toggle Menu">
          <MenuStack>
            <MenuItem><Button label="A"/></MenuItem>
            <MenuItemFlyout label="Toggle Menu B">
              <MenuStack>
                <MenuItem><Button label="B-1"/></MenuItem>
                <MenuItem><Button label="B-2"/></MenuItem>
                <MenuItem><Button label="B-2"/></MenuItem>
              </MenuStack>
            </MenuItemFlyout>
            <MenuItemFlyout isOpen={true} label="Toggle Menu C">
              <MenuStack>
                <MenuItem><Button label="C-1"/></MenuItem>
                <MenuItem><Button label="C-2"/></MenuItem>
              </MenuStack>
            </MenuItemFlyout>
            <MenuItem><Button label="E"/></MenuItem>
          </MenuStack>
        </MenuItemFlyout>
      </MenuStack>

      <h3>Menu Bar Flyout</h3>
      <MenuBar look="raised">
        <MenuItem><Button label="Single Action"/></MenuItem>
        <MenuItemFlyout label="Toggle action set 1">
          <MenuStack>
            <MenuItem><Button label="Action 1-1"/></MenuItem>
            <MenuItem><Button label="Action 1-2"/></MenuItem>
            <MenuItem><Button label="Action 1-3"/></MenuItem>
          </MenuStack>
        </MenuItemFlyout>
        <MenuItemFlyout isOpen={true} label="Toggle action set 2">
          <MenuStack>
            <MenuItem><Button label="Action 2-1"/></MenuItem>
            <MenuItem><Button label="Action 2-2"/></MenuItem>
          </MenuStack>
        </MenuItemFlyout>
      </MenuBar>

      <h3>Menu Button Grouped</h3>
      <MenuButton look="raised">
        <MenuItem>
          <MenuButtonGroup>
            <MenuItemFlyout>
              <MenuStack>
                <MenuItem><Button label="Action 1-1"/></MenuItem>
                <MenuItem><ButtonLink href="#Menu" label="Action 1-2"/></MenuItem>
              </MenuStack>
            </MenuItemFlyout>
            <MenuItem><ButtonLink href="#Menu" label="Action 1"/></MenuItem>
          </MenuButtonGroup>
        </MenuItem>

        <MenuItem>
          <MenuButtonGroup>
            <MenuItem><Button label="Action 2"/></MenuItem>
            <MenuItemFlyout>
              <MenuStack>
                <MenuItem><ButtonLink href="#Menu" label="Action 2-1"/></MenuItem>
                <MenuItem><Button label="Action 2-2"/></MenuItem>
              </MenuStack>
            </MenuItemFlyout>
          </MenuButtonGroup>
        </MenuItem>

        <MenuItem><Button label="Single Action"/></MenuItem>

        <MenuItem>
          <MenuButtonGroup>
            <MenuItemFlyout>
              <MenuStack>
                <MenuItem><ButtonLink href="#Menu" label="Action 4a-1"/></MenuItem>
                <MenuItem><Button label="Action 4a-2"/></MenuItem>
              </MenuStack>
            </MenuItemFlyout>
            <MenuItem><Button label="Action 4c"/></MenuItem>
            <MenuItem><ButtonLink href="#Menu" label="Action 4d"/></MenuItem>
            <MenuItemFlyout>
              <MenuStack>
                <MenuItem><Button label="Action 4b-1"/></MenuItem>
                <MenuItem><ButtonLink href="#Menu" label="Action 4b-2"/></MenuItem>
              </MenuStack>
            </MenuItemFlyout>
          </MenuButtonGroup>
        </MenuItem>
      </MenuButton>
      {/* end example */}
    </div>
  )
}
