export const dialogInfo = {
  rootEntitiesDeletable: {
    User: {
      entityLabel: 'Person',
      keys: ['100']
    }
  },
  rootEntitiesNotDeletable: {
    User: {
      entityLabel: 'Person',
      keys: ['9', '1']
    }
  },
  relatedDeletable: {
    Resource: {
      entityLabel: 'Dokument',
      keys: ['17719', '33'],
      keysOtherBu: []
    },
    Output_job_item: {
      entityLabel: 'Einzeldokumente',
      keys: ['10303'],
      keysOtherBu: []
    }
  },
  relatedNotDeletable: {
    Resource: {
      entityLabel: 'Dokument',
      keys: ['44', '20000'],
      keysOtherBu: ['583']
    },
    Order: {
      entityLabel: 'Auftrag',
      keys: ['1023'],
      keysOtherBu: []
    }
  },
  hasUnreadableEntities: true
}
