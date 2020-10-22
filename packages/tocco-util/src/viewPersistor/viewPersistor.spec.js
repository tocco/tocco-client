import viewPersistor from './'

describe('tocco-util', () => {
  describe('viewPersistor', () => {
    beforeEach(() => {
      viewPersistor.clearPersistedViews()
    })

    describe('persistViewInfo', () => {
      test('should add info and return it with same location path', () => {
        const location = '/1'
        const info = {store: {a: 1}}
        viewPersistor.persistViewInfo(location, info)
        expect(viewPersistor.viewInfoSelector(location)).to.eql(info)
      })

      test('should extens existing info', () => {
        const location = '/1'
        const info = {store: {a: 1}}
        viewPersistor.persistViewInfo(location, info)
        const info2 = {somethingElse: true}
        viewPersistor.persistViewInfo(location, info2)
        expect(viewPersistor.viewInfoSelector(location)).to.eql({...info, ...info2})
      })

      test('should keep existing locations infos', () => {
        const location = '/1'
        const location2 = '/2'
        const info = {store: {a: 1}}
        viewPersistor.persistViewInfo(location, info)
        const info2 = {somethingElse: true}
        viewPersistor.persistViewInfo(location2, info2)
        expect(viewPersistor.viewInfoSelector(location)).to.eql(info)
        expect(viewPersistor.viewInfoSelector(location2)).to.eql(info2)
      })
    })

    describe('clearPersistedViews', () => {
      test('should delete everything with no level', () => {
        viewPersistor.persistViewInfo('a', {a: 1})
        viewPersistor.persistViewInfo('b', {b: 1})
        viewPersistor.clearPersistedViews()
        expect(viewPersistor.viewInfoSelector('a')).to.be.empty
        expect(viewPersistor.viewInfoSelector('b')).to.be.empty
      })

      test('should only delete given level and higher', () => {
        viewPersistor.persistViewInfo('a', {a: 1}, 1)
        viewPersistor.persistViewInfo('b', {b: 1}, 2)
        viewPersistor.persistViewInfo('c', {c: 1}, 3)
        viewPersistor.persistViewInfo('d', {d: 1}, 1)
        viewPersistor.clearPersistedViews(2)
        expect(viewPersistor.viewInfoSelector('a')).not.to.be.empty
        expect(viewPersistor.viewInfoSelector('b')).to.be.empty
        expect(viewPersistor.viewInfoSelector('c')).to.be.empty
        expect(viewPersistor.viewInfoSelector('d')).not.to.be.empty
      })

      describe('viewInfoSelector', () => {
        test('should return empty object on none-existing location', () => {
          expect(viewPersistor.viewInfoSelector('a')).to.be.empty
        })
      })
    })
  })
})
