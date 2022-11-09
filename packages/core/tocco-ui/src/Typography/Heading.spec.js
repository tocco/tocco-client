import {screen, render} from '@testing-library/react'

import {H1, H2, H3, H4, H5, H6} from './Heading'

describe('tocco-ui', () => {
  describe('Typography', () => {
    describe('Heading', () => {
      describe('H1', () => {
        test('should not render title', () => {
          render(<H1>Lorem ipsum</H1>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.queryByTitle('Lorem ipsum')).equal(null)
          expect(screen.getByText('Lorem ipsum')).exist
        })

        test('should render title', () => {
          render(<H1 breakWords={false}>Lorem ipsum</H1>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.getByTitle('Lorem ipsum')).exist
          expect(screen.getByText('Lorem ipsum')).exist
        })
      })

      describe('H2', () => {
        test('should not render title', () => {
          render(<H2>Lorem ipsum</H2>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.queryByTitle('Lorem ipsum')).equal(null)
          expect(screen.getByText('Lorem ipsum')).exist
        })

        test('should render title', () => {
          render(<H2 breakWords={false}>Lorem ipsum</H2>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.getByTitle('Lorem ipsum')).exist
          expect(screen.getByText('Lorem ipsum')).exist
        })
      })

      describe('H3', () => {
        test('should not render title', () => {
          render(<H3>Lorem ipsum</H3>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.queryByTitle('Lorem ipsum')).equal(null)
          expect(screen.getByText('Lorem ipsum')).exist
        })

        test('should render title', () => {
          render(<H3 breakWords={false}>Lorem ipsum</H3>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.getByTitle('Lorem ipsum')).exist
          expect(screen.getByText('Lorem ipsum')).exist
        })
      })

      describe('H4', () => {
        test('should not render title', () => {
          render(<H4>Lorem ipsum</H4>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.queryByTitle('Lorem ipsum')).equal(null)
          expect(screen.getByText('Lorem ipsum')).exist
        })

        test('should render title', () => {
          render(<H4 breakWords={false}>Lorem ipsum</H4>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.getByTitle('Lorem ipsum')).exist
          expect(screen.getByText('Lorem ipsum')).exist
        })
      })

      describe('H5', () => {
        test('should not render title', () => {
          render(<H5>Lorem ipsum</H5>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.queryByTitle('Lorem ipsum')).equal(null)
          expect(screen.getByText('Lorem ipsum')).exist
        })

        test('should render title', () => {
          render(<H5 breakWords={false}>Lorem ipsum</H5>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.getByTitle('Lorem ipsum')).exist
          expect(screen.getByText('Lorem ipsum')).exist
        })
      })

      describe('H6', () => {
        test('should not render title', () => {
          render(<H6>Lorem ipsum</H6>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.queryByTitle('Lorem ipsum')).equal(null)
          expect(screen.getByText('Lorem ipsum')).exist
        })

        test('should render title', () => {
          render(<H6 breakWords={false}>Lorem ipsum</H6>)
          expect(screen.getByRole('heading')?.textContent).contain('Lorem ipsum')
          expect(screen.getByTitle('Lorem ipsum')).exist
          expect(screen.getByText('Lorem ipsum')).exist
        })
      })
    })
  })
})
