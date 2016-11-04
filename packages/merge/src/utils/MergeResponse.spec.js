import {mergingWithoutProblems} from './MergeResponse'

describe('merge', () => {
  describe('utils ', () => {
    describe('MergeResponse', () => {
      it('should be successfully if both arrays empty', () => {
        const response = {
          'notCopiedRelations': [],
          'notDeletedEntities': []
        }

        const result = mergingWithoutProblems(response)
        result.should.be.true
      })
    })

    it('should not be successfully if either array is not empty', () => {
      let response = {
        'notCopiedRelations': [{}],
        'notDeletedEntities': []
      }

      let result = mergingWithoutProblems(response)
      result.should.be.false

      response = {
        'notCopiedRelations': [],
        'notDeletedEntities': [{}]
      }

      result = mergingWithoutProblems(response)
      result.should.be.false
    })
  })
})
