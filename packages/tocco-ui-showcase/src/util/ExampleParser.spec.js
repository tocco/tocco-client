import {extractExampleCode, extractRealImports, removeIndent} from './ExampleParser'

describe('tocco-ui-showcase', () => {
  describe('utils ', () => {
    describe('ExampleParser', () => {
      it('should extract examplecode line', () => {

        var example = '<div>\n {/* start example */}\n CODE\n{/* end example */}\n</div>'
        var result = extractExampleCode(example)

        result.should.eql(' CODE')
      })

      it('should return whole example text if no start string present', () => {

        var example = `CODE`
        var result = extractExampleCode(example)

        result.should.eql('CODE')
      })


      it('should return whole example text if no start string present', () => {

        var example = `CODE`
        var result = extractExampleCode(example)

        result.should.eql('CODE')
      })

      it('should extract real import', () => {

        var example = `
        //real-import:import x from 'y'
        <div>
          {/* start example */}
            CODE
          {/* end example */}
        </div>
        // real-import:import z from 'y'`
        var result = extractRealImports(example)

        result.should.eql('import x from \'y\'\nimport z from \'y\'')
      })

      it('should extract real import', () => {

        var example = '    4Spaces\n     5Spaces'
        var result = removeIndent(example)

        result.should.eql('4Spaces\n 5Spaces')
      })
    })
  })
})
