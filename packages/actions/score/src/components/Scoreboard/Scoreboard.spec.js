import {render, screen} from '@testing-library/react'

import Scoreboard from './Scoreboard'

describe('score', () => {
  describe('components', () => {
    describe('Scoreboard', () => {
      const dataInfo = [
        {
          resultUserBean: {
            key: '11947',
            entity: 'User',
            defaultDisplay: 'User'
          },
          points: 12,
          place: 1
        },
        {
          resultUserBean: {
            key: '11708',
            entity: 'User',
            defaultDisplay: 'User'
          },
          points: 8,
          place: 2
        },
        {
          resultUserBean: {
            key: '10912',
            entity: 'User',
            defaultDisplay: 'User'
          },
          points: 1,
          place: 3
        },
        {
          resultUserBean: {
            key: '941',
            entity: 'User',
            defaultDisplay: 'User'
          },
          points: 1,
          place: 3
        },
        {
          resultUserBean: {
            key: '1',
            entity: 'User',
            defaultDisplay: 'User'
          },
          points: 1,
          place: 3
        },
        {
          resultUserBean: {
            key: '11701',
            entity: 'User',
            defaultDisplay: 'User'
          },
          points: 0,
          place: 6
        }
      ]
      test('should show a table with all Tournament attendees', () => {
        const fetchDataConfig = sinon.spy()

        render(<Scoreboard data={dataInfo} fetchData={fetchDataConfig}></Scoreboard>)

        expect(screen.getAllByText('User')).to.have.length(6)
        expect(screen.queryAllByTestId('place')).to.have.length(6)
        expect(screen.queryAllByTestId('defaultDisplay')).to.have.length(6)
        expect(screen.queryAllByTestId('points')).to.have.length(6)
        expect(screen.queryAllByTestId('key')).to.have.length(0)
        expect(screen.queryAllByTestId('entity')).to.have.length(0)
        expect(screen.getByText('Punkte'))
        expect(screen.getByText('Platzierung'))
        expect(screen.getByText('Nachname, Vorname'))
      })
      test('should trigger the fetch-function', () => {
        const fetchDataConfig = sinon.spy()

        render(<Scoreboard data={dataInfo} fetchData={fetchDataConfig}></Scoreboard>)

        expect(fetchDataConfig).to.have.been.calledOnce
      })

      test('should work without data', () => {
        const fetchDataConfig = sinon.spy()
        const newDataInfo = []
        render(<Scoreboard data={newDataInfo} fetchData={fetchDataConfig}></Scoreboard>)
        expect(screen.getByText('Punkte'))
        expect(screen.getByText('Platzierung'))
        expect(screen.getByText('Nachname, Vorname'))
        expect(screen.queryAllByTestId('place')).to.have.length(0)
        expect(screen.queryAllByTestId('defaultDisplay')).to.have.length(0)
        expect(screen.queryAllByTestId('points')).to.have.length(0)
        expect(fetchDataConfig).to.have.been.calledOnce
      })
    })
  })
})
