import React from 'react'
import {storiesOf} from '@storybook/react'

import Button from '../Button'
import ButtonLink from '../ButtonLink'
import Typography from '../Typography'
import {Icon} from '../Icon/Icon'
import Menu from './'
import {Menu as Raw} from './Menu'

storiesOf('Tocco-UI | Menu', module)
  .add(
    'Menu',
    () =>
      <div>
        <h3>Menu Items Flat</h3>
        <Menu.Stack look="flat">
          <Menu.Item><Button label="<Button>"/></Menu.Item>
          <Menu.Item><Button ink="primary" label="<Button primary>"/></Menu.Item>
          <hr/>
          <Menu.Item><ButtonLink href="#Menu" label="<ButtonLink>"/></Menu.Item>
          <Menu.Item><ButtonLink href="#Menu" ink="primary" label="<ButtonLink primary>"/></Menu.Item>
        </Menu.Stack>

        <h3>Menu Items Raised</h3>
        <Menu.Stack look="raised">
          <Menu.Item><Button label="<Button raised>"/></Menu.Item>
          <Menu.Item><Button ink="primary" label="<Button raised primary>"/></Menu.Item>
          <Menu.Item><ButtonLink href="#Menu" label="<ButtonLink raised>"/></Menu.Item>
          <Menu.Item><ButtonLink href="#Menu" ink="primary" label="<ButtonLink raised primary>"/></Menu.Item>
        </Menu.Stack>

        <h3>Menu Items Miscellaneous</h3>
        <Menu.Stack look="flat">
          <Menu.Item><Typography.Span>span</Typography.Span></Menu.Item>
          <Menu.Item><Typography.Em>em</Typography.Em></Menu.Item>
          <hr/>
          <Menu.Item><Typography.Strong>strong</Typography.Strong></Menu.Item>
          <Menu.Item><Icon icon="far, check-square"/></Menu.Item>
        </Menu.Stack>
        <h3>Menu Bar Flat</h3>
        <Menu.Bar>
          <Menu.Item><Button label="<Button>"/></Menu.Item>
          <Menu.Item><Button ink="primary" label="<Button primary>"/></Menu.Item>
          <hr/>
          <Menu.Item><ButtonLink href="#Menu" label="<ButtonLink>"/></Menu.Item>
          <Menu.Item><ButtonLink href="#Menu" ink="primary" label="<ButtonLink primary>"/></Menu.Item>
        </Menu.Bar>

        <h3>Menu Button Raised</h3>
        <Menu.Button look="raised">
          <Menu.Item><Button label="<Button>"/></Menu.Item>
          <Menu.Item><Button ink="primary" label="<Button primary>"/></Menu.Item>
          <hr/>
          <Menu.Item><ButtonLink href="#Menu" label="<ButtonLink>"/></Menu.Item>
          <Menu.Item><ButtonLink href="#Menu" ink="primary" label="<ButtonLink primary>"/></Menu.Item>
        </Menu.Button>

        <h3>Menu Stack</h3>
        <Menu.Stack>
          <Menu.Item><Button label="A"/></Menu.Item>
          <Menu.Item>
            <Button label="B"/>
            <Menu.Stack>
              <Menu.Item isOpen={false}>
                <Button label="B-1"/>
                <Menu.Stack>
                  <Menu.Item><Button label="B-1-a"/></Menu.Item>
                  <Menu.Item><Button label="B-1-b"/></Menu.Item>
                </Menu.Stack>
              </Menu.Item>
              <Menu.Item><Button label="B-2"/></Menu.Item>
            </Menu.Stack>
          </Menu.Item>
          <Menu.Item><Button label="C"/></Menu.Item>
        </Menu.Stack>

        <h3>Accordion Menu</h3>
        <Menu.Stack>
          <Menu.ItemAccordion label="Toggle Menu">
            <Menu.Stack>
              <Menu.Item><Button label="A"/></Menu.Item>
              <Menu.Item><Button label="B"/></Menu.Item>
              <Menu.ItemAccordion isOpen={false} label="Toggle C">
                <Menu.Stack>
                  <Menu.Item><Button label="C-1"/></Menu.Item>
                  <Menu.Item><Button label="C-2"/></Menu.Item>
                </Menu.Stack>
              </Menu.ItemAccordion>
              <Menu.Item><Button label="E"/></Menu.Item>
            </Menu.Stack>
          </Menu.ItemAccordion>
        </Menu.Stack>

        <h3>Flyout Menu</h3>
        <Menu.Stack>
          <Menu.ItemFlyout isOpen={true} label="Toggle Menu">
            <Menu.Stack>
              <Menu.Item><Button label="A"/></Menu.Item>
              <Menu.ItemFlyout label="Toggle Menu B">
                <Menu.Stack>
                  <Menu.Item><Button label="B-1"/></Menu.Item>
                  <Menu.Item><Button label="B-2"/></Menu.Item>
                  <Menu.Item><Button label="B-2"/></Menu.Item>
                </Menu.Stack>
              </Menu.ItemFlyout>
              <Menu.ItemFlyout isOpen={true} label="Toggle Menu C">
                <Menu.Stack>
                  <Menu.Item><Button label="C-1"/></Menu.Item>
                  <Menu.Item><Button label="C-2"/></Menu.Item>
                </Menu.Stack>
              </Menu.ItemFlyout>
              <Menu.Item><Button label="E"/></Menu.Item>
            </Menu.Stack>
          </Menu.ItemFlyout>
        </Menu.Stack>

        <h3>Menu Bar Flyout</h3>
        <Menu.Bar look="raised">
          <Menu.Item><Button label="Single Action"/></Menu.Item>
          <Menu.ItemFlyout label="Toggle action set 1">
            <Menu.Stack>
              <Menu.Item><Button label="Action 1-1"/></Menu.Item>
              <Menu.Item><Button label="Action 1-2"/></Menu.Item>
              <Menu.Item><Button label="Action 1-3"/></Menu.Item>
            </Menu.Stack>
          </Menu.ItemFlyout>
          <Menu.ItemFlyout isOpen={true} label="Toggle action set 2">
            <Menu.Stack>
              <Menu.Item><Button label="Action 2-1"/></Menu.Item>
              <Menu.Item><Button label="Action 2-2"/></Menu.Item>
            </Menu.Stack>
          </Menu.ItemFlyout>
        </Menu.Bar>

        <h3>Menu Button Grouped</h3>
        <Menu.Button look="raised">
          <Menu.Item>
            <Menu.ButtonGroup>
              <Menu.ItemFlyout>
                <Menu.Stack>
                  <Menu.Item><Button label="Action 1-1"/></Menu.Item>
                  <Menu.Item><ButtonLink href="#Menu" label="Action 1-2"/></Menu.Item>
                </Menu.Stack>
              </Menu.ItemFlyout>
              <Menu.Item><ButtonLink href="#Menu" label="Action 1"/></Menu.Item>
            </Menu.ButtonGroup>
          </Menu.Item>

          <Menu.Item>
            <Menu.ButtonGroup>
              <Menu.Item><Button label="Action 2"/></Menu.Item>
              <Menu.ItemFlyout>
                <Menu.Stack>
                  <Menu.Item><ButtonLink href="#Menu" label="Action 2-1"/></Menu.Item>
                  <Menu.Item><Button label="Action 2-2"/></Menu.Item>
                </Menu.Stack>
              </Menu.ItemFlyout>
            </Menu.ButtonGroup>
          </Menu.Item>

          <Menu.Item><Button label="Single Action"/></Menu.Item>

          <Menu.Item>
            <Menu.ButtonGroup>
              <Menu.ItemFlyout>
                <Menu.Stack>
                  <Menu.Item><ButtonLink href="#Menu" label="Action 4a-1"/></Menu.Item>
                  <Menu.Item><Button label="Action 4a-2"/></Menu.Item>
                </Menu.Stack>
              </Menu.ItemFlyout>
              <Menu.Item><Button label="Action 4c"/></Menu.Item>
              <Menu.Item><ButtonLink href="#Menu" label="Action 4d"/></Menu.Item>
              <Menu.ItemFlyout>
                <Menu.Stack>
                  <Menu.Item><Button label="Action 4b-1"/></Menu.Item>
                  <Menu.Item><ButtonLink href="#Menu" label="Action 4b-2"/></Menu.Item>
                </Menu.Stack>
              </Menu.ItemFlyout>
            </Menu.ButtonGroup>
          </Menu.Item>
        </Menu.Button>
      </div>,
    {info: {
      propTables: [Raw],
      propTablesExclude: [Button, ButtonLink, Icon, Typography.Em, Typography.Span, Typography.Strong]
    }}
  )
