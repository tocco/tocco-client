import {validateCssDimension} from '../utilStyles'

describe('tocco-ui', () => {
  describe('utilStyles', () => {
    describe('validateCssDimension (propTypes)', () => {
      const props = {}
      const valid = [
        '1%',
        '1em',
        '1fr',
        '1px',
        '12px',
        '123px',
        '1234px',
        '1rem',
        '1vh',
        '1vmax',
        '1vmin',
        '1vw'
      ]
      const invalid = [
        '%',
        'em',
        'fr',
        'px',
        'rem',
        'vh',
        'vmax',
        'vmin',
        'vw',
        '-1%',
        '-1em',
        '-1fr',
        '-1px',
        '-1rem',
        '-1vh',
        '-1vmax',
        '-1vmin',
        '-1vw',
        '0%',
        '0em',
        '0fr',
        '0px',
        '0rem',
        '0vh',
        '0vmax',
        '0vmin',
        '0vw',
        '1 %',
        '1 em',
        '1 fr',
        '1 px',
        '1 2px',
        '1 23px',
        '1 234px',
        '1 rem',
        '1 vh',
        '1 vmax',
        '1 vmin',
        '1 vw',
        '1%;',
        '1em;',
        '1fr;',
        '1px;',
        '12px;',
        '123px;',
        '1234px;',
        '1rem;',
        '1vh;',
        '1vmax;',
        '1vmin;',
        '1vw;'
      ]

      test('should be valid dimension', () => {
        valid.map(value => {
          props.dimension = value
          expect(validateCssDimension(props, 'dimension')).to.be.null
        })
      })

      test('should be invalid dimension', () => {
        invalid.map(value => {
          props.dimension = value
          expect(validateCssDimension(props, 'dimension')).to.be.an('error')
        })
      })
    })
  })
})
