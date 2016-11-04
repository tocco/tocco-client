import {extractExampleCode, extractRealImports, removeIndent} from './ExampleParser'

describe('tocco-ui-showcase', () => {
  describe('utils ', () => {
    describe('ExampleParser', () => {
      it('should extract examplecode line', () => {
        const example = '<div>\n {/* start example */}\n CODE\n{/* end example */}\n</div>'
        const result = extractExampleCode(example)

        result.should.eql(' CODE')
      })

      it('should return whole example text if no start string present', () => {
        const example = `CODE`
        const result = extractExampleCode(example)

        result.should.eql('CODE')
      })

      it('should return whole example text if no start string present', () => {
        const example = `CODE`
        const result = extractExampleCode(example)

        result.should.eql('CODE')
      })

      it('should extract real import', () => {
        const example = `
        //real-import:import x from 'y'
        <div>
          {/* start example */}
            CODE
          {/* end example */}
        </div>
        // real-import:import z from 'y'`
        const result = extractRealImports(example)

        result.should.eql('import x from \'y\'\nimport z from \'y\'')
      })

      it('should extract real import', () => {
        const example = '    4Spaces\n     5Spaces'
        const result = removeIndent(example)

        result.should.eql('4Spaces\n 5Spaces')
      })
    })
  })
})
