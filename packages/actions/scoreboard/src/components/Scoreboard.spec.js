import {render, screen} from '@testing-library/react'
import {expect} from 'chai'

import Scoreboard from './Scoreboard'

describe('scoreboard', () => {
  describe('components', () => {
    describe('Scoreboard', () => {
      test('checks if the right content is printed with one set of data', () => {
        render(
          <Scoreboard
            data={[
              {
                points: 3,
                ranking: 1,
                participantBean: {
                  defaultDisplay: 'testName',
                  entity: 'User',
                  key: 1
                }
              }
            ]}
            fetchData={() => {}}
          />
        )
        expect(screen.queryAllByText('testName')).to.have.length(1)
        expect(screen.queryAllByText('Ranking: 1')).to.have.length(1)
        expect(screen.queryAllByText('Points: 3')).to.have.length(1)

        expect(screen.queryAllByText('User')).to.have.length(0)
      })

      test('checks if the right content is printed with several sets of data', () => {
        const renderRender = render(
          <Scoreboard
            data={[
              {
                points: 3,
                ranking: 1,
                participantBean: {
                  defaultDisplay: 'testName',
                  entity: 'User',
                  key: 1
                }
              },
              {
                points: 0,
                ranking: 2,
                participantBean: {
                  defaultDisplay: 'testAnotherName',
                  entity: 'User',
                  key: 2
                }
              }
            ]}
            fetchData={() => {}}
          />
        )

        renderRender.debug()

        expect(screen.queryAllByText('testName')).to.have.length(1)
        expect(screen.queryAllByText('Ranking: 1')).to.have.length(1)
        expect(screen.queryAllByText('Points: 3')).to.have.length(1)

        expect(screen.queryAllByText('testAnotherName')).to.have.length(1)
        expect(screen.queryAllByText('Ranking: 2')).to.have.length(1)
        expect(screen.queryAllByText('Points: 0')).to.have.length(1)

        expect(screen.queryAllByText('User')).to.have.length(0)
      })

      test('should fetch Scoreboard once ', () => {
        const fetchScoreboardConfig = sinon.spy()
        render(<Scoreboard data={[]} fetchData={fetchScoreboardConfig} />)
        expect(fetchScoreboardConfig).to.have.been.calledOnce
      })
    })
  })
})
