import {storiesOf} from '@storybook/react'
import React from 'react'

import SignalList from './index'

storiesOf('Tocco-UI | SignalList', module)
  .add(
    'SignalList',
    () => <div>
      <SignalList.List>
        <SignalList.Item
          label="base"
        />
        <SignalList.Item
          condition="primary"
          label="primary"
        />
        <SignalList.Item
          condition="danger"
          label="danger"
        />
        <SignalList.Item
          condition="success"
          label="success"
        />
        <SignalList.Item
          condition="warning"
          label="warning"
        />
      </SignalList.List>

      <SignalList.List>
        <SignalList.Item
          condition="danger"
          label="danger supercalifragilisticexpialidocioussupercalifragilisticexpialidocious">
          <SignalList.List>
            <SignalList.Item
              condition="danger"
              label="A. signalize error supercalifragilisticexpialidocioussupercalifragilisticexpialidocious">
              <SignalList.List>
                <SignalList.Item
                  condition="success"
                  label="A.1. signalize success supercalifragilisticexpialidocioussupercalifragilisticexpialidocious"
                />
                <SignalList.Item
                  condition="danger"
                  label="B.2 signalize danger"
                />
                <SignalList.Item
                  condition="danger"
                  label="B.3. signalize danger"
                />
              </SignalList.List>
            </SignalList.Item>
            <SignalList.Item
              condition="warning"
              label="B. signalize warning">
              <SignalList.List>
                <SignalList.Item
                  condition="warning"
                  label="B.1. signalize warning"
                />
                <SignalList.Item
                  condition="success"
                  label="B.2. signalize success"
                />
              </SignalList.List>
            </SignalList.Item>
          </SignalList.List>
        </SignalList.Item>
      </SignalList.List>
    </div>
  )
