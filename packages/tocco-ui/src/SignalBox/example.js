/* eslint no-console: 0 */
import React from 'react'

import SignalBox from './'
import SignalList, {SignalListItem} from '../SignalList'
import {B, I, P} from '../Typography'
// real-import:import {SignalBox} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <SignalBox
        condition="danger"
        title="Summarize information"
        meta="06.12.2016 - 14:40, Message Type XY, Message Source, Message ID 000123"
      >
        <SignalList>
          <SignalListItem
            condition="danger"
            label="Lorem ipsum dolor sit amet"
          />
          <SignalListItem
            condition="danger"
            label="consectetur adipisicing elit, sed do eiusmod"
          />
        </SignalList>
      </SignalBox>

      <SignalBox condition="warning">
        <P>Lorem ipsum <B>bold</B> sit <I>italic</I> amet</P>
      </SignalBox>

      <SignalBox condition="success">
        <P>Lorem ipsum <B>bold</B> sit <I>italic</I> amet</P>
      </SignalBox>

      <SignalBox>
        <P>Lorem ipsum <B>bold</B> sit <I>italic</I> amet</P>
      </SignalBox>
      {/* end example */}
    </div>
  )
}
