import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {intlEnzyme} from 'tocco-test-util'

import InfoBox from '../InfoBox/InfoBox'
import Dashboard from './Dashboard'
import {StyledColumn, StyledResizeHandle} from './StyledComponents'

describe('dashboard', () => {
  describe('components', () => {
    describe('Dashboard', () => {
      describe('Dashboard', () => {
        test('should render boxes in defined order', () => {
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
        })

        test('should drag and drop over another infobox', () => {
          const store = createStore(() => ({}))
          const baseInfoBox = {
            height: 100,
            label: 'test',
            content: {type: 'htmlfield', text: '<p>Hi</p>'}
          }
          const infoBoxes = [
            {
              id: '1',
              position: '1:0',
              col: 0,
              row: 0,
              ...baseInfoBox
            },
            {
              id: '2',
              position: '1:1',
              col: 0,
              row: 1,
              ...baseInfoBox
            }
          ]

          const expectedInfoBoxes = [
            {
              id: '2',
              position: '1:1',
              col: 0,
              row: 0,
              ...baseInfoBox
            },
            {
              id: '1',
              position: '1:0',
              col: 0,
              row: 1,
              ...baseInfoBox
            }
          ]

          const saveInfoBoxPositions = sinon.spy()

          const wrapper = intlEnzyme.mountWithIntl(
              <Provider store={store}>
                <Dashboard
                  infoBoxes={infoBoxes}
                  saveInfoBoxHeight={() => {}}
                  saveInfoBoxPositions={saveInfoBoxPositions}
                />
              </Provider>
          )

          wrapper.find('#infobox-1').find(InfoBox).simulate('dragstart')
          wrapper.find('#infobox-2').find(InfoBox).simulate('dragenter',
            {target: {getBoundingClientRect: () => ({y: 10, height: 100})}})
          wrapper.find('#infobox-2').find(InfoBox).simulate('dragover',
            {clientY: 80})
          wrapper.find('#infobox-2').find(InfoBox).simulate('drop')
          wrapper.find('#infobox-2').find(InfoBox).simulate('dragend')

          expect(saveInfoBoxPositions).to.have.been.calledWith(expectedInfoBoxes)
        })

        test('should drag and drop over another column', () => {
          const store = createStore(() => ({}))
          const baseInfoBox = {
            height: 100,
            label: 'test',
            content: {type: 'htmlfield', text: '<p>Hi</p>'}
          }
          const infoBoxes = [
            {
              id: '1',
              position: '1:0',
              col: 0,
              row: 0,
              ...baseInfoBox
            },
            {
              id: '2',
              position: '1:1',
              col: 0,
              row: 1,
              ...baseInfoBox
            }
          ]

          const expectedInfoBoxes = [
            {
              id: '2',
              position: '1:1',
              col: 0,
              row: 0,
              ...baseInfoBox
            },
            {
              id: '1',
              position: '1:0',
              col: 1,
              row: 0,
              ...baseInfoBox
            }
          ]

          const saveInfoBoxPositions = sinon.spy()

          const wrapper = intlEnzyme.mountWithIntl(
              <Provider store={store}>
                <Dashboard
                  infoBoxes={infoBoxes}
                  saveInfoBoxHeight={() => {}}
                  saveInfoBoxPositions={saveInfoBoxPositions}
                />
              </Provider>
          )
          
          const secondColumn = wrapper.find(StyledColumn).at(1)
          wrapper.find('#infobox-1').find(InfoBox).simulate('dragstart')
          secondColumn.simulate('dragenter')
          secondColumn.simulate('dragover')
          secondColumn.simulate('drop')
          secondColumn.simulate('dragend')

          expect(saveInfoBoxPositions).to.have.been.calledWith(expectedInfoBoxes)
        })

        test('should change infobox height', () => {
          const store = createStore(() => ({}))
          const baseInfoBox = {
            height: 100,
            label: 'test',
            content: {type: 'htmlfield', text: '<p>Hi</p>'}
          }
          const infoBoxes = [
            {
              id: '1',
              position: '1:0',
              col: 0,
              row: 0,
              ...baseInfoBox
            }
          ]

          const saveInfoBoxHeight = sinon.spy()

          const wrapper = intlEnzyme.mountWithIntl(
              <Provider store={store}>
                <Dashboard
                  infoBoxes={infoBoxes}
                  saveInfoBoxHeight={saveInfoBoxHeight}
                  saveInfoBoxPositions={() => {}}
                />
              </Provider>
          )
          
          wrapper.find('#infobox-1').find(StyledResizeHandle).simulate('mousedown')
          wrapper.simulate('mousemove', {clientX: 100, clientY: 100})
          wrapper.simulate('mousemove', {clientX: 200, clientY: 200})
          wrapper.simulate('mouseup')

          expect(saveInfoBoxHeight).to.have.been.calledWith('1', 100)
        })
      })
    })
  })
})
