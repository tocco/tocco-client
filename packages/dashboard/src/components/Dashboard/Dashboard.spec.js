import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {intlEnzyme} from 'tocco-test-util'

import InfoBox from '../InfoBox/InfoBox'
import Dashboard from './Dashboard'

describe('dashboard', () => {
  describe('components', () => {
    describe('Dashboard', () => {
      describe('Dashboard', () => {
        test(
          'should render boxes in defined order',
          () => {
            const store = createStore(() => ({}))
            const content = {type: 'htmlfield', text: '<p>Hi</p>'}
            const infoBoxes = [
              {
                id: '1',
                position: '1:0',
                col: 0,
                row: 0,
                height: 100,
                label: 'test',
                content
              },
              {
                id: '2',
                position: '1:0',
                col: 0,
                row: 0,
                height: 100,
                label: 'test',
                content
              },
              {
                id: '3',
                position: '1:0',
                col: 0,
                row: 0,
                height: 100,
                label: 'test',
                content
              },
              {
                id: '5',
                position: '1:1',
                col: 0,
                row: 1,
                height: 100,
                label: 'test',
                content
              },
              {
                id: '4',
                position: '1:2',
                col: 0,
                row: 2,
                height: 100,
                label: 'test',
                content
              }
            ]

            const wrapper = intlEnzyme.mountWithIntl(
              <Provider store={store}>
                <Dashboard infoBoxes={infoBoxes} saveInfoBoxHeight={() => {}} saveInfoBoxPositions={() => {}}/>
              </Provider>
            )

            expect(wrapper.find(InfoBox)).to.have.length(5)
            expect(wrapper.find(InfoBox).map(box => box.props().id)).to.deep.equal(['1', '2', '3', '5', '4'])
          }
        )
      })
    })
  })
})
