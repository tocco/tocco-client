import deleteRequestParser from './deleteRequestParser'

const exampleResponse = {
  entitiesToDelete: [
    {
      rootEntity: {
        entityModel: 'User',
        pk: '100',
        entityName: 'Person',
        businessUnitId: null,
        deleteStatus: 'DELETABLE'
      },
      affectedEntities: [{
        entityModel: 'Resource',
        pk: '17719',
        entityName: 'Dokument',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      },
      {
        entityModel: 'Resource',
        pk: '33',
        entityName: 'Dokument',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      },
      {
        entityModel: 'Output_job_item',
        pk: '10303',
        entityName: 'Einzeldokumente',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      }],
      unreadableEntities: false
    },
    {
      rootEntity: {
        entityModel: 'User',
        pk: '9',
        entityName: 'Person',
        businessUnitId: null,
        deleteStatus: 'NO_DELETE_PERMISSION'
      },
      affectedEntities: [
        {
          entityModel: 'Resource',
          pk: '44',
          entityName: 'Dokument',
          businessUnitId: 'test1',
          deleteStatus: 'NO_DELETE_PERMISSION'
        },
        {
          entityModel: 'Order',
          pk: '1023',
          entityName: 'Auftrag',
          businessUnitId: 'test1',
          deleteStatus: 'DENIED_BY_CASCADE'
        },
        {
          entityModel: 'Resource',
          pk: '20000',
          entityName: 'Dokument',
          businessUnitId: 'test1',
          deleteStatus: 'NO_DELETE_PERMISSION'
        }
      ],
      unreadableEntities: true
    },
    {
      rootEntity: {
        entityModel: 'User',
        pk: '1',
        entityName: 'Person',
        businessUnitId: null,
        deleteStatus: 'DELETABLE'
      },
      affectedEntities: [{
        entityModel: 'Resource',
        pk: '20000',
        entityName: 'Dokument',
        businessUnitId: 'test1',
        deleteStatus: 'NO_DELETE_PERMISSION'
      },
      {
        entityModel: 'Resource',
        pk: '583',
        entityName: 'Dokument',
        businessUnitId: 'test2',
        deleteStatus: 'NO_DELETE_PERMISSION'
      },
      {
        entityModel: 'Resource',
        pk: '1001',
        entityName: 'Dokument',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      },
      {
        entityModel: 'Effort',
        pk: '122',
        entityName: 'Leistung',
        businessUnitId: 'test1',
        deleteStatus: 'DELETABLE'
      }
      ],
      unreadableEntities: false
    }
  ]
}

const expectedResult = {
  entityModel: 'User',
  entityName: 'Person',
  deletable: ['100'],
  notDeletable: ['9', '1'],
  deletableRelated: {
    Resource: {
      entityName: 'Dokument',
      pks: ['17719', '33'],
      pksOtherBu: []
    },
    Output_job_item: {
      entityName: 'Einzeldokumente',
      pks: ['10303'],
      pksOtherBu: []
    }
  },
  notDeletableRelated: {
    Resource: {
      entityName: 'Dokument',
      pks: ['44', '20000'],
      pksOtherBu: ['583']
    },
    Order: {
      entityName: 'Auftrag',
      pks: ['1023'],
      pksOtherBu: []
    }
  },
  unreadableEntities: true
}

describe('delete', () => {
  describe('util', () => {
    describe('deleteResponseParser', () => {
      test('should transform the response to desired format', () => {
        const result = deleteRequestParser(exampleResponse, 'test1')
        expect(result).to.deep.eql(expectedResult)
      })
    })
  })
})
