/* eslint no-console: 0 */
import React from 'react'
import SignalList, {SignalListItem} from './'
// real-import:import {SignalList, SignalListItem} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <SignalList>
        <SignalListItem
          label="base"
        />
        <SignalListItem
          condition="primary"
          label="primary"
        />
        <SignalListItem
          condition="danger"
          label="danger"
        />
        <SignalListItem
          condition="success"
          label="success"
        />
        <SignalListItem
          condition="warning"
          label="warning"
        />
      </SignalList>

      <SignalList>
        <SignalListItem
          condition="danger"
          label="danger supercalifragilisticexpialidocioussupercalifragilisticexpialidocious">
          <SignalList>
            <SignalListItem
              condition="danger"
              label="A. signalize error supercalifragilisticexpialidocioussupercalifragilisticexpialidocious">
              <SignalList>
                <SignalListItem
                  condition="success"
                  label="A.1. signalize success supercalifragilisticexpialidocioussupercalifragilisticexpialidocious"
                />
                <SignalListItem
                  condition="danger"
                  label="B.2 signalize danger"
                />
                <SignalListItem
                  condition="danger"
                  label="B.3. signalize danger"
                />
              </SignalList>
            </SignalListItem>
            <SignalListItem
              condition="warning"
              label="B. signalize warning">
              <SignalList>
                <SignalListItem
                  condition="warning"
                  label="B.1. signalize warning"
                />
                <SignalListItem
                  condition="success"
                  label="B.2. signalize success"
                />
              </SignalList>
            </SignalListItem>
          </SignalList>
        </SignalListItem>
      </SignalList>
      {/* end example */}
    </div>
  )
}
