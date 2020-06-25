import {createDummyEntities, createUsers} from './entityFactory'
import {setupFetchMock, setupSystemMock, sleep} from './mockData'

export default {
  createDummyEntities,
  createUsers,
  setupFetchMock,
  setupSystemMock,
  data: {
    userLisForm: require('./data/user_list_form'),
    userDetailForm: require('./data/user_detail_form'),
    userListSmallForm: require('./data/user_list_small_form.json'),
    userSearchForm: require('./data/user_search_form'),
    dummyEntitySearchForm: require('./data/dummy_entity_search_form'),
    dummyEntityListForm: require('./data/dummy_entity_list_form'),
    textResources: require('./data/textResources')
  },
  sleep
}
