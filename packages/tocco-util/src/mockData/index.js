import {createDummyEntities, createUsers} from './entityFactory'
import {setupFetchMock} from './fetchMock'

export default {
  createDummyEntities,
  createUsers,
  setupFetchMock,
  data: {
    userLisForm: require('./data/user_list_form'),
    userListSmallForm: require('./data/user_list_small_form.json'),
    userSearchForm: require('./data/user_search_form'),
    dummyEntitySearchForm: require('./data/dummy_entity_search_form'),
    dummyEntityListForm: require('./data/dummy_entity_list_form')
  }
}
