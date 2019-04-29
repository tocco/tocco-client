import React from 'react'
import {storiesOf} from '@storybook/react'

import SignalBox from './'
import SignalList from '../SignalList'
import {SignalList as Raw} from '../SignalList/SignalList'
import {Typography} from '../index'

storiesOf('Tocco-UI | SignalBox', module)
  .add(
    'SignalBox',
    () => <div>
      <SignalBox
        condition="danger"
        title="Summarize information"
        meta="06.12.2016 - 14:40, Message Type XY, Message Source, Message ID 000123"
      >
        <SignalList.List>
          <SignalList.Item
            condition="danger"
            label="Lorem ipsum dolor sit amet"
          />
          <SignalList.Item
            condition="danger"
            label="consectetur adipisicing elit, sed do eiusmod"
          />
        </SignalList.List>
      </SignalBox>

      <SignalBox condition="warning">
        <Typography.P>
          Lorem ipsum <Typography.B>bold</Typography.B> sit <Typography.I>italic</Typography.I> amet
        </Typography.P>
      </SignalBox>

      <SignalBox condition="success">
        <Typography.P>
          Lorem ipsum <Typography.B>bold</Typography.B> sit <Typography.I>italic</Typography.I> amet
        </Typography.P>
      </SignalBox>

      <SignalBox>
        <Typography.P>
          Lorem ipsum <Typography.B>bold</Typography.B> sit <Typography.I>italic</Typography.I> amet
        </Typography.P>
      </SignalBox>
    </div>,
    {info: {propTables: [SignalBox], propTablesExclude: [Raw, Typography.I, Typography.P, Typography.B]}}
  )
